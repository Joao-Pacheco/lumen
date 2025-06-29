import useStoreCurrentDate from "@/stores/useStoreCurrentDate";

export default function Footer() {
  const { currentDate, setCurrentDate } = useStoreCurrentDate();

  function goToNextDay(direction: "back" | "forward") {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === "back" ? -1 : 1));
    setCurrentDate(newDate);
  }
  function goToToday() {
    const newDate = new Date();
    setCurrentDate(newDate);
  }
  return (
    <div className="fixed bottom-5 w-full flex justify-between px-5">
      <button
        className="color-primary text-white rounded-full w-10 h-10 flex items-center justify-center"
        onClick={() => goToNextDay("back")}
      >
        ‹
      </button>

      <button
        className="color-primary text-white rounded-md w-25 h-10 flex items-center justify-center"
        onClick={() => goToToday()}
      >
        HOJE
      </button>
      <button
        className="color-primary text-white rounded-full w-10 h-10 flex items-center justify-center"
        onClick={() => goToNextDay("forward")}
      >
        ›
      </button>
    </div>
  );
}
