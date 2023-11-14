import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'

const SignupPage = () => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [pw2, setPw2] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const id = e.target.id.value
        const pw = e.target.pw.value
        const pw2 = e.target.pw2.value

        if (name && id && pw && pw2) { //모두 입력한 상태
            if (pw == pw2) {
                const signupData = {
                    name: name,
                    id: id,
                    pw: pw,
                }

                axios.post(process.env.NEXT_PUBLIC_SIGNUP, null, { params: signupData }).then((res) => {
                    Router.push('/login')
                })
            } else { // pw != pw2
                alert('패스워드 확인이 틀렸습니다.')
            }
        } else {  //빈 칸 있음.
            alert('모두 입력해주세요')
        }
    }

    return (
        <div>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        회원가입
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className='space-y-6' method='POST' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                                Email address
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Password
                                </label>
                            </div>
                            <div className='mt-2'>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Password check
                                </label>
                            </div>
                            <div className='mt-2'>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='text' className='block text-sm font-medium leading-6 text-gray-900'>
                                name
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    autoComplete='text'
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
                        회원이신가요?{' '}
                        <Link href='/login' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                            로그인하러 가기.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage