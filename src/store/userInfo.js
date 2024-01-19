import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserInfoStore = create(
  persist(
    (set) => ({
      accessToken: '',
      refreshToken: '',
      nickname: '',
      loginId: '',
      likes: [],
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setNickname: (nickname) => set({ nickname }),
      setLoginId: (loginId) => set({ loginId }),
      setLikes: (likes) => set({ likes: [...likes] }),
      addLike: (like) => set(state => ({ likes: [...state.likes, like] })),
      deleteLike: (like) => set(state => ({ likes: state.likes.filter(l => l !== like) })),
    }),
    {
      name: 'user-info-storage'
    }
  )
)

export default useUserInfoStore
