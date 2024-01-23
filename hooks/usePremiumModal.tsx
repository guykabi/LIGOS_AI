import {create} from 'zustand' 

type usePremiumModalStore = {
  isOpen:boolean;
  onOpen:()=>void;
  onClose:()=>void
} 

export const usePremiumModal = create<usePremiumModalStore>((set)=>({
    isOpen:false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false})
}))