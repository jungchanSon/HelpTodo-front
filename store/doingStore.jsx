import create from 'zustand'

const doingStore = create((set) => ({
    doingData: null,

    setDoingDatas: (prop) => set((state) => ({ doingData: prop })),
}))

export default doingStore
