"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import dataBible from "../public/plan/plan365.json";
import ReadingBox from "@/components/ReadingBox";
import useStoreCurrentDate from "@/store/useStoreCurrentDate";
import Footer from "@/components/Footer";

export default function Home() {
  const [progress, setProgress] = useState<number>(0);
  const { currentDate } = useStoreCurrentDate();
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

  useEffect(() => {
    const dayOfYear = getDayOfYear(currentDate);
    const totalDays = currentDate.getFullYear() % 4 === 0 ? 366 : 365;
    setProgress(Math.floor((dayOfYear / totalDays) * 100));
    setDailyText(findDailyText(currentDate));
  }, [currentDate, findDailyText]);

  return (
    <div className="p-5 flex flex-col items-center">
      <ProgressBar progress={progress} />
      <p className="text-4xl font-light my-4">
        {dataToShow.day} de {dataToShow.month}
      </p>

      <ReadingBox {...dailyText} />
      <Footer />
    </div>
  );
}
