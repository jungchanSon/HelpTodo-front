import React from 'react'

import Link from 'next/link'

const SignUp = () => {
    return (
        <Link href={'/signup'} className={'px-4 hover:bg-gray-100 text-lg font-bold'}>
            <button type='button' className='btn btn-outline-info'>
                회원가입
            </button>
        </Link>
    )
}

export default SignUp
