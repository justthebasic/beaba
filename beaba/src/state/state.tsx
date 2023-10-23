import { create } from 'zustand'

type BearStore = {
  isUserValid: boolean;
  setUserValid: (arg: boolean) => void;
}

export const useBearStore = create<BearStore>((set) => ({
  isUserValid: false,
  setUserValid: (arg: boolean) => set({isUserValid: arg}),
  
}))

