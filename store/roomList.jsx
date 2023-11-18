import create from 'zustand'

const roomList = create((set) => ({
    myTeams: null,
    rooms: null,

    setMyTeams: (prop) => set((state) => ({ myTeams: prop })),
    setRooms: (prop) => set((state) => ({ rooms: prop })),

    // removeItemRooms: (prop) =>
    //     set((state) => ({rooms: state.rooms.filter((item)=>{item != })}),
}))

export default roomList
