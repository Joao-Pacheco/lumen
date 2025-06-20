import { create } from "zustand";

type Store = {
  currentDate: Date;
  setCurrentDate: (value: Date) => void;
};

const useStoreCurrentDate = create<Store>()((set) => ({
  currentDate: new Date(),
  setCurrentDate: (value: Date) => set((state) => ({ currentDate: value })),
}));

export default useStoreCurrentDate;
