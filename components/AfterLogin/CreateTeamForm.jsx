import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import userStore from '../../store/userStore'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import roomList from '../../store/roomList'
import todoTableStore from '../../store/todoTableStore'

const CreateTeamForm = () => {
    const { userName } = userStore()
    const { todoTableData, setTodoTableData } = todoTableStore()
    const { myTeams, setMyTeams } = roomList()
    const [cookie, setCookie, removeCookie] = useCookies(['token'])

    useEffect(() => {
        if (!cookie.token || !userName) {
            Router.push('/login')
        }
    }, [])

    const submitCreateTeam = (e) => {
        e.preventDefault()

        const teamName = e.target.teamName.value
        const teamPW = e.target.teamPw.value

        const createTeamData = {
            teamName: teamName,
            teamPassword: teamPW,
        }

        axios
            .post(process.env.NEXT_PUBLIC_CREATE_TEAM, null, {
                params: createTeamData,
            })
            .then((res) => {
                if (res.status === 200) {
                    const createRoomData = {
                        title: 'default',
                        teamName: teamName,
                    }

                    axios
                        .post(process.env.NEXT_PUBLIC_CREATE_TODOLIST, null, {
                            params: createRoomData,
                        })
                        .then(() => {
                            axios
                                .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                                    params: { teamName: teamName },
                                })
                                .then((res) => {
                                    setTodoTableData(res.data)
                                })
                        })

                    axios.post(process.env.NEXT_PUBLIC_FIND_MY_TEAM, null, {}).then((res) => {
                        setMyTeams(res.data)
                    })
                }
            })
    }
    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 lg:mx-auto'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    팀 생성
                </h2>
            </div>
            <form
                className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg'
                onSubmit={submitCreateTeam}
            >
                <div className='flex items-center justify-between'>
                    <label
                        htmlFor='teamName'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        팀 이름
                    </label>
                </div>
                <div className='mt-2'>
                    <input
                        id='teamName'
                        name='teamName'
                        type='text'
                        required
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <label
                        htmlFor='teamPw'
                        className='block text-sm font-medium leading-6 text-gray-900'
                    >
                        팀 비밀번호
                    </label>
                </div>
                <div className='mt-2'>
                    <input
                        id='teamPw'
                        name='teamPw'
                        type='password'
                        required
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </div>

                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <button type='reset' className='text-sm font-semibold leading-6 text-gray-900'>
                        초기화
                    </button>
                    <button
                        type='submit'
                        className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        팀 생성
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTeamForm
