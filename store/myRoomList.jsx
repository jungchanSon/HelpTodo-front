import create from "zustand";

const myRoomList = create(set => ({
  myRooms: null,
  setMyRooms: (prop) => set((state)=> ({rooms: prop})),
}))

export default myRoomList;