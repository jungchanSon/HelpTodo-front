import create from "zustand";

interface dataInfo{
  userName: string,
  userId: string,
  setUserName: (props: string) => void,
  removeUserName: () => void,
}

const userStore = create<dataInfo>(set => ({
  userName: "",
  userId: "",
  setUserName: (prop:string) => set((state)=> ({userName: prop})),
  removeUserName: () => set((state)=> ({userName: ""}))
}))

export default userStore;