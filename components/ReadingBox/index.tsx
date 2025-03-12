import React, { useCallback } from "react";
import { bibleAbbreviations } from "./bibleAbbreviations";

export default function ReadingBox({ Old, New, Psalms, Proverbs }: DailyText) {
  const urlbible = "https://www.bible.com/pt/bible/129/";

  const buildUrl = useCallback((abbreviation: string, chapter: string) => {
    return `${urlbible}${abbreviation}.${chapter}.NVI`;
  }, []);

  const handleClick = useCallback(
    (text: string) => {
      const abbreviation = bibleAbbreviations[text.split(" ")[0]];
      const chapter = text.split(" ")[1].split(":")[0];
      window.open(buildUrl(abbreviation, chapter), "_blank")?.focus();
    },
    [buildUrl]
  );

  return (
    <div className="flex flex-col items-center gap-3">
      {[
        { key: "Old", text: Old },
        { key: "New", text: New },
        { key: "Psalms", text: Psalms },
        { key: "Proverbs", text: Proverbs },
      ].map(({ key, text }) => (
        <button
          key={key}
          className="bg-[#2e3e36] text-white px-4 py-2 rounded-md w-52 text-center"
          onClick={() => handleClick(text)}
        >
          <p className="text-lg">{text}</p>
        </button>
      ))}
    </div>
  );
}
