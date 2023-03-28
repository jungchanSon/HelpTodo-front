import create from 'zustand'
import { persist } from 'zustand/middleware'

const userStore = create(
    persist(
        (set) => ({
            userName: null,
            userId: null,

            setUserName: (prop) => set((state) => ({ userName: prop })),
            removeUserName: () => set((state) => ({ userName: null })),
            setUserId: (prop) => set((state) => ({ userId: prop })),
            removeUserId: () => set((state) => ({ userName: '' })),
        }),
        { name: 'user_id' },
    ),
)
export default userStore
