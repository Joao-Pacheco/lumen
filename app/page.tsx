"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import dataBible from "../public/plan/plan365.json";

interface DailyText {
  Old: string;
  New: string;
  Psalms: string;
  Proverbs: string;
}

interface Plan365 {
  [key: string]: {
    [key: string]: DailyText;
  };
}

export default function Home() {
  const [progress, setProgress] = useState<number>(0);
  const [currentData, setCurrentData] = useState(new Date());
  const [dataToShow, setDataToShow] = useState({ month: "", day: "" });
  const [dailyText, setDailyText] = useState({
    Old: "",
    New: "",
    Psalms: "",
    Proverbs: "",
  });

  function findDailyText(data: Date) {
    const newDate = transformDate(data);
    return (dataBible as Plan365)[newDate.month][parseInt(newDate.day)];
  }

  function transformDate(date: Date) {
    const month = date.toLocaleString("pt-BR", { month: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    setDataToShow({ month, day });
    return { month, day };
  }

  function getDayOfYear(date: Date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function goToNextDay(direction: "back" | "forward") {
    const newDate = new Date(currentData);
    newDate.setDate(newDate.getDate() + (direction === "back" ? -1 : 1));
    setCurrentData(newDate);
  }

  useEffect(() => {
    const dayOfYear = getDayOfYear(currentData);
    const totalDays = currentData.getFullYear() % 4 === 0 ? 366 : 365;
    setProgress(Math.floor((dayOfYear / totalDays) * 100));
    setDailyText(findDailyText(currentData));
  }, [currentData]);

  return (
    <div className="p-5 flex flex-col items-center">
      <ProgressBar progress={progress} />
      <p className="text-4xl font-light my-4">
        {dataToShow.day} de {dataToShow.month}
      </p>

      <div className="flex flex-col items-center gap-3">
        {["Old", "New", "Psalms", "Proverbs"].map((key) => (
          <button
            key={key}
            className="bg-[#2e3e36] text-white px-4 py-2 rounded-md w-52 text-center"
          >
            <p className="text-lg">{dailyText[key as keyof DailyText]}</p>
          </button>
        ))}
      </div>

      <div className="fixed bottom-5 w-full flex justify-between px-5">
        <button
          className="bg-[#2e3e36] text-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => goToNextDay("back")}
        >
          ‹
        </button>
        <button
          className="bg-[#2e3e36] text-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => goToNextDay("forward")}
        >
          ›
        </button>
      </div>
    </div>
  );
}
