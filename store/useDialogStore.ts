import { create } from "zustand";

interface DialogStore {
  buildingOfferDialog: boolean;
  buildingSellDialog: boolean;
  setDialogState: (dialog: keyof Omit<DialogStore, 'setDialogState'>, active: boolean) => void;
}

const useDialogStore = create<DialogStore>((set) => ({
  buildingOfferDialog: false,
  buildingSellDialog: false,
  setDialogState: (dialog, active) => {
    set((state) => {
      const newState: DialogStore = {
        ...state,
        [dialog]: active,
      };
      return newState;
    });
  },
}));

export default useDialogStore;