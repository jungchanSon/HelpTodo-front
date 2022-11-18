import create from "zustand";

interface dataInfo{
  userName: String,
  setUserName: (props: string) => void;
  removeUserName: () => void;
}

const userStore = create<dataInfo>(set => ({
  userName: "",
  setUserName: (prop:String) => set((state)=> ({userName: prop})),
  removeUserName: () => set((state)=> ({userName: ""}))
}))

export default userStore;