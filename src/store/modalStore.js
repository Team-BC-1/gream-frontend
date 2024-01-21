import { create } from 'zustand'

const modalStore = create((set) => ({
  gifticonImageModalState: {
    isOpen: false,
    imageUrl: '',
  },
  setGifticonImageModalState: ({ isOpen, imageUrl }) => set({ gifticonImageModalState: { isOpen, imageUrl } }),
}))

export default modalStore