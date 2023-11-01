import { create } from 'zustand'
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  payload: { userEstado: string; userCargo: string; userName: string; userId: number };
  userEstado: string;
  userCargo: string;
  userName: string;
  
  // Adicione outras propriedades conforme necessário
}

const getDecodedToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const decoded = jwtDecode<DecodedToken>(token)
    console.log(token)
    // console.log(decoded)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    return decoded
  }
  return null;
}
const decodedToken = getDecodedToken();

if (decodedToken) {
  const { userEstado, userCargo } = decodedToken.payload;

  if (userEstado == "pendente" && userCargo == "user") {
    // Usuário pendente precisa da aprovação do admin
    // Implemente a lógica aqui, como a exibição de uma mensagem
    console.log("usuario pendente")
  }
  
  // Outras lógicas de regras de negócio
}
console.log(decodedToken?.payload.userName);
console.log(decodedToken?.payload.userCargo);

console.log(decodedToken)

type BearStore = {
  isUserValid: boolean;
  setUserValid: (arg: boolean) => void;
}

type UserStoreState = {
  user: DecodedToken | null;
  setUser: (user: DecodedToken | null) => void;
}

export const useBearStore = create<BearStore>((set) => ({
  isUserValid: false,
  setUserValid: (arg: boolean) => set({ isUserValid: arg }),

}))


export const useUserStore = create<UserStoreState>((set) => ({
  user: getDecodedToken(),
  setUser: (user) => set({ user }),
}));



