import create from "zustand";

interface dataInfo{
  userName: string,
  userId: string,
  setUserName: (props: string) => void,
  removeUserName: () => void,
  setUserId: (props: string) => void,
  removeUserId: () => void,
}


const userStore = create<dataInfo>(set => ({
  userName: "",
  userId: "",
  setUserName: (prop:string) => set((state)=> ({userName: prop})),
  removeUserName: () => set((state)=> ({userName: ""})),
  setUserId: (prop:string) => set((state)=> ({userId: prop})),
  removeUserId: () => set((state)=> ({userName: ""}))
}))

export default userStore;