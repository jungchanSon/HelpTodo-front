import Link from 'next/link'
import userStore from '../../store/userStore'
import { useCookies } from 'react-cookie'
import submitLoginForm from '../../components/api/MemberAPI'
import axios from 'axios'
import Router from 'next/router'
import { cookies } from 'next/headers'

const LoginPage = () => {
    const { setUserName } = userStore()
    const [cookie, setCookie] = useCookies(['token'])
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const input_id = e.target.id.value
        const input_pw = e.target.pw.value

        const loginData = {
            id: input_id,
            pw: input_pw,
        }
        axios.post(process.env.NEXT_PUBLIC_LOGIN, null, { params: loginData }).then((res) => {
            const jwt = res.data.token
            const expiredMs = res.data.expiredMs
            const memberName = res.data.memberName

            setCookie('token', jwt, {
                expires: new Date(Date.now() + expiredMs),
            })
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt //or res.data 등...

            if (res.status == 200) {
                Router.push('/')
            }
            setUserName(memberName)
        })
    }
    // const handleLoginSubmit = (e) => {
    //     const { status, jwt, expiredMs, memberName } = submitLoginForm(e)
    //
    //     setCookie('token', jwt, {
    //         expires: new Date(Date.now() + expiredMs),
    //     })
    //
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt //or res.data 등...
    //
    //     setUserName(memberName)
    //
    //     if (status == 200) {
    //         Router.push('/')
    //     }
    // }
    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    로그인
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form className='space-y-6' method='POST' onSubmit={handleLoginSubmit}>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            id
                        </label>
                        <div className='mt-2'>
                            <input
                                id='id'
                                name='id'
                                type='text'
                                required
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between'>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Password
                            </label>
                            {/*<div className="text-sm">*/}
                            {/*    <a*/}
                            {/*        href="#"*/}
                            {/*        className="font-semibold text-indigo-600 hover:text-indigo-500"*/}
                            {/*    >*/}
                            {/*        비밀번호를 잃어버리셨나요?*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                        </div>
                        <div className='mt-2'>
                            <input
                                id='pw'
                                name='pw'
                                type='password'
                                required
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            로그인
                        </button>
                    </div>
                </form>

                <p className='mt-10 text-center text-sm text-gray-500'>
                    아직 회원이 아니신가요?{' '}
                    <Link
                        href='/signup'
                        className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                    >
                        간편 회원가입.
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
