import React, { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import userStore from '../../store/userStore'
import Router from 'next/router'

const navigation = [
    { name: '홈', href: '/' },
]
const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { userName, setUserName, removeUserName } = userStore()
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if (userName != null && cookie.token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [userName, cookie])

    const handleLogout = () => {
        removeUserName()
        removeCookie('token')
        Router.reload()
    }
    const dialClose = () => {
        setMobileMenuOpen(false)
    }
    return (
        <header className='inset-x-0 top-0 z-50'>
            <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
                <div className='flex lg:hidden'>
                    <button
                        type='button'
                        className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className='sr-only'>Open main menu</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>
                <div className='hidden lg:flex lg:gap-x-12'>
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className='text-sm font-semibold leading-6 text-gray-900'
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
                    {isLogin ? (
                        <div>
                            <span className='mx-3'>{userName} 님</span>
                            <button
                                type='button'
                                className='border-solid border-2 border-red-300 rounded px-1 hover:bg-red-300 hover:text-white'
                                onClick={handleLogout}
                            >
                                로그아웃
                                <span aria-hidden=' true' className='mr-2'>
                                    &rarr;
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link
                                href='/login'
                                className=' text-sm font-semibold leading-6 text-gray-900 underline-offset-0
                                        text-decoration-none'
                            >
                                로그인{' '}
                                <span aria-hidden=' true' className=' mr-2'>
                                    &rarr;
                                </span>
                            </Link>
                            <Link
                                href='/signup'
                                className=' text-sm font-semibold leading-6 text-gray-900 text-decoration-none'
                            >
                                회원가입 <span aria-hidden=' true'>&rarr;</span>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            <Dialog
                as='div'
                className='lg:hidden'
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className=' fixed inset-0 z-50' />
                <Dialog.Panel
                    className=' fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm
                                        sm:ring-1 sm:ring-gray-900/
                                10'
                    onClick={dialClose}
                >
                    <div className='mt-6 flow-root'>
                        <div className='-my-6 divide-y divide-gray-500/10'>
                            <div className='space-y-2 py-6'>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                        onClick={dialClose}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            {isLogin ? (
                                <div>
                                    <span className='mx-3'>{userName} 님</span>
                                    <button
                                        type='button'
                                        className='btn btn-outline-success'
                                        onClick={handleLogout}
                                    >
                                        로그아웃
                                        <span aria-hidden='true' className='mr-2'>
                                            &rarr;
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <div className='py-6'>
                                    <Link
                                        href='/login'
                                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                        onClick={dialClose}
                                    >
                                        로그인
                                    </Link>
                                    <Link
                                        href='/signup'
                                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                                        onClick={dialClose}
                                    >
                                        회원가입
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

export default Header
