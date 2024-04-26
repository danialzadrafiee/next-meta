import {create} from "zustand";

interface GameUIStore {
  buildingDrawerShowing: boolean;
  setBuildingDrawerShowing: (active: boolean) => void;
}

const useGameuiStore = create<GameUIStore>(set => ({
  buildingDrawerShowing: false,
  setBuildingDrawerShowing: active => set({ buildingDrawerShowing: active }),
}));

export default useGameuiStore;
