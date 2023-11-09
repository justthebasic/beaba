import { create } from 'zustand'
import { jwtDecode } from "jwt-decode";


export interface DecodedToken {
  payload: { userEstado: string; userCargo: string; userName: string; userId: number };
  userEstado: string;
  userCargo: string;
  userName: string;

  // Adicione outras propriedades conforme necessário
}

// const getDecodedToken = () => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     const decoded = jwtDecode<DecodedToken>(token)
//     console.log(token)
//     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
//     return decoded
//   }
//   return null;
// }






type BearStore = {
  isUserValid: boolean;
  setUserValid: (arg: boolean) => void;
}

type UserStoreState = {
  user: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
  logout: (user: null) => void;
}


export const useBearStore = create<BearStore>((set) => ({
  isUserValid: false,
  setUserValid: (arg: boolean) => set({ isUserValid: arg }),

}))


// export const useUserStore = create<UserStoreState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
// }));

// const decodedToken = getDecodedToken();
// useUserStore.setState({ user: decodedToken });
export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
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
    set({ user: null });
  },
}));


