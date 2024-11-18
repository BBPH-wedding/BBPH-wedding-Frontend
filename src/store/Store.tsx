
import { create } from "zustand";

interface ReservationState {
  userEmail: string;
  setUserEmail: (email: string) => void;
}

export const useReservationStore = create<ReservationState>((set) => ({
  userEmail: "",
  setUserEmail: (email) => set({ userEmail: email }),
}));



interface TokenState {
  token: string;
  setToken: (token: string) => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
}));




interface AuthModalState {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isAuthModalOpen: false,
  setIsAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
}));





interface CodeModalState {
  isCodeModalOpen: boolean;
  setIsCodeModalOpen: (isOpen: boolean) => void;
}

export const useCodeModalStore = create<CodeModalState>((set) => ({
  isCodeModalOpen: false,
  setIsCodeModalOpen: (isOpen) => set({ isCodeModalOpen: isOpen }),
}));





interface FormModalState {
  isFormModalOpen: boolean;
  setIsFormModalOpen: (isOpen: boolean) => void;
}

export const useFormModalStore = create<FormModalState>((set) => ({
  isFormModalOpen: false,
  setIsFormModalOpen: (isOpen) => set({ isFormModalOpen: isOpen }),
}));



export const useTokenLoginStore = create<TokenState>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
}));


interface LoginModalState {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isLoginModalOpen: false,
  setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),
}));


interface EditModalState {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
}

export const useEditModalStore = create<EditModalState>((set) => ({
  isEditModalOpen: false,
  setIsEditModalOpen: (isOpen) => set({ isEditModalOpen: isOpen }),
}));


interface LoginEmailState {
  userEmailLogin: string;
  setUserEmailLogin: (email: string) => void;
}

export const useEmailLoginStore = create<LoginEmailState>((set) => ({
  userEmailLogin: "",
  setUserEmailLogin: (email) => set({ userEmailLogin: email }),
}));
