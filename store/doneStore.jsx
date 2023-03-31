import create from 'zustand'

const doneStore = create((set) => ({
    doneData: null,

    setDoneDatas: (prop) => set((state) => ({ doneData: prop })),
}))

export default doneStore
