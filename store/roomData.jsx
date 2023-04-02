import create from 'zustand'
import { persist } from 'zustand/middleware'

const roomData = create(
    persist(
        (set) => ({
            roomName: null,
            roomCreateDate: null,
            roomCreator: null,

            setRoomName: (prop) => set((state) => ({ roomName: prop })),
            setRoomCreateDate: (prop) => set((state) => ({ roomCreateDate: prop })),
            setRoomCreator: (prop) => set((state) => ({ roomCreator: prop })),
        }),
        { name: 'room' },
    ),
)

export default roomData
