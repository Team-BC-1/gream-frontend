import { create } from 'zustand'

const useUserInfoStore = create((set) => ({
  accessToken: '',
  refreshToken: '',
  nickname: '',
  loginId: '',
  setAccessToken: (accessToken) => set({
    accessToken
  }),
  setRefreshToken: (refreshToken) => set({
    refreshToken
  }),
  setNickname: (nickname) => set({
    nickname
  }),
  setLoginId: (loginId) => set({
    loginId
  })
}))

export default useUserInfoStore
