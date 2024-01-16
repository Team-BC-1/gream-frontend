import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserInfoStore = create(
  persist(
    (set) => ({
      accessToken: '',
      refreshToken: '',
      nickname: '',
      loginId: '',
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setNickname: (nickname) => set({ nickname }),
      setLoginId: (loginId) => set({ loginId })
    }),
    {
      name: 'user-info-storage'
    }
  )
)

export default useUserInfoStore
