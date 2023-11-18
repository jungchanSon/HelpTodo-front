import create from 'zustand'
import { persist } from 'zustand/middleware'

const roomData = create(
    persist(
        (set) => ({
            teamName: null,
            teamCreateDate: null,
            teamCreator: null,

            setTeamName: (prop) => set((state) => ({ teamName: prop })),
            setTeamCreateDate: (prop) => set((state) => ({ teamCreateDate: prop })),
            setTeamCreator: (prop) => set((state) => ({ teamCreator: prop })),
            removeTeamData: () =>
                set((state) => ({
                    teamName: null,
                    teamCreateDate: null,
                    teamCreator: null,
                })),
        }),
        { name: 'room' },
    ),
)

export default roomData
