import { create } from 'zustand'
import { jwtDecode } from "jwt-decode";


export interface DecodedToken {
  payload: { userEstado: string; userCargo: string; userName: string; userId: number };
  userEstado: string;
  userCargo: string;
  userName: string;
}


type UserStoreState = {
  user: DecodedToken | null;
  isUserValid: boolean | null;
  setUser: (user: DecodedToken | null) => void;
  setUserValid: (isValid: boolean) => void;
  getDecodedToken: () => DecodedToken | null;
  logout: () => void;
};

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  isUserValid: null,
  setUser: (user) => set({ user }),
  setUserValid: (isValid) => set({ isUserValid: isValid }),
  getDecodedToken: () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    }
    return null;
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, isUserValid: false });
  },
}));






// export const useUserStore = create<UserStoreState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
// }));

// const decodedToken = getDecodedToken();
// useUserStore.setState({ user: decodedToken });


