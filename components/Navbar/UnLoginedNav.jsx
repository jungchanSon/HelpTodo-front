import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const UnLoginedNav = () => {
    return (
        <Link href={'/login'} className={'px-4 hover:bg-gray-100 text-lg font-bold'}>
            <button type="button" className="btn btn-outline-info">
                로그인
            </button>
        </Link>
    )
}

export default UnLoginedNav
