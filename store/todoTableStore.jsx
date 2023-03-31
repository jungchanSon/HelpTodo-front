import create from 'zustand'

const todoTableStore = create((set) => ({
    todoTableData: null,
    is_reloadTodoTableData: false,

    setTodoTableData: (prop) => set((state) => ({ todoTableData: prop })),
    on_Is_reloadTodoData: () => set((state) => ({ is_reloadTodoData: true })),
    off_Is_reloadTodoData: () => set((state) => ({ is_reloadTodoData: false })),
}))

export default todoTableStore
