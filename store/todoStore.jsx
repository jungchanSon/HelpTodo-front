import create from 'zustand'

const todoStore = create((set) => ({
    todoData: null,

    setTodoData: (prop) => set((state) => ({ todoData: prop })),
}))

export default todoStore
