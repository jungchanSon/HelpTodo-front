import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import roomData from '../../store/roomData'
import todoTableStore from '../../store/todoTableStore'
import axios from 'axios'

const AddTodoForm = () => {
    const { teamName, setTeamName, setTeamCreator, setTeamCreateDate } = roomData()
    const { todoTableData, setTodoTableData, is_reloadTodoTableData, off_Is_reloadTodoData } =
        todoTableStore()

    const addTodo = (e) => {
        e.preventDefault()

        const addTddData = {
            teamName: teamName,
            content: e.target.todo.value,
            todoListId: todoTableData[0].id,
            startDate: e.target.start.value,
            endDate: e.target.end.value,
            manager: e.target.manager.value,
        }

        axios
            .post(process.env.NEXT_PUBLIC_ADD_TDD_CARD + 'todo', null, {
                params: addTddData,
            })
            .then((res) => {
                axios
                    .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                        params: { teamName: teamName },
                    })
                    .then((res) => {
                        setTodoTableData(res.data)
                    })
            })
    }
    return (
        <div>
            <h3>할 일 등록</h3>
            <form onSubmit={addTodo}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-100">
                                <label
                                    htmlFor="todo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    할 일
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="todo"
                                        name="todo"
                                        type="text"
                                        autoComplete="todo"
                                        placeholder="할 일을 입력하세요"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-100">
                                <label
                                    htmlFor="manager"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    담당자
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="manager"
                                        name="manager"
                                        type="text"
                                        placeholder="담당자 이름"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="start"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    시작일
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="start"
                                        autoComplete="date"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="end"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    마감일
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="end"
                                        autoComplete="date"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        초기화
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        저장
                    </button>
                </div>
            </form>
        </div>
    )
}
export default AddTodoForm
