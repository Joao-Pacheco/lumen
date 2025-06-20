"use client";
import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import ThemeButton from "../components/ThemeButton";
import dataBible from "../public/plan/plan365.json";
import ReadingBox from "@/components/ReadingBox";
import useStoreCurrentDate from "@/stores/useStoreCurrentDate";
import Footer from "@/components/Footer";
import { getStorage, setStorage } from "@/lib/storage-handler";
import { STORAGE_KEY } from "@/common/const";
import useTheme from "@/hooks/useTheme";
import "./globals.css";

export default function Home() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [progress, setProgress] = useState<number>(0);
  const { currentDate, setCurrentDate } = useStoreCurrentDate();
  const [dataToShow, setDataToShow] = useState({ month: "", day: "" });
  const [dailyText, setDailyText] = useState({
    Old: "",
    New: "",
    Psalms: "",
    Proverbs: "",
  });

  useTheme();

  function transformDate(date: Date) {
    const month = date.toLocaleString("pt-BR", { month: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    return { month, day };
  }

  function findDailyText(date: Date) {
    const { month, day } = transformDate(date);
    return (
      (dataBible as Plan365)[month]?.[parseInt(day)] ?? {
        Old: "",
        New: "",
        Psalms: "",
        Proverbs: "",
      }
    );
  }

  function getDayOfYear(date: Date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  useEffect(() => {
    if (firstLoad) {
      const storedDate = new Date(getStorage(STORAGE_KEY) ?? currentDate);
      setFirstLoad(false);
      setCurrentDate(storedDate);
    }

    setDataToShow(transformDate(currentDate));
    setDailyText(findDailyText(currentDate));

    const dayOfYear = getDayOfYear(currentDate);
    const totalDays = currentDate.getFullYear() % 4 === 0 ? 366 : 365;
    setProgress(Math.floor((dayOfYear / totalDays) * 100));

    setStorage(STORAGE_KEY, currentDate.toString());
  }, [currentDate, firstLoad]);

  return (
    <div className="p-5 flex flex-col items-center h-screen bg-primary">
      <ProgressBar progress={progress} />
      <ThemeButton />
      <p className="text-4xl font-light my-4 dark:text-white">
        {dataToShow.day} de {dataToShow.month}
      </p>

      <ReadingBox {...dailyText} />
      <Footer />
    </div>
  );
}
