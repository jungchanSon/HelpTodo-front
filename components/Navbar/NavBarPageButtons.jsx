import React from 'react'

import styled from 'styled-components'
import Link from 'next/link'

const NavBarPageButtons = () => {
    return (
        <>
            <LinkLayout>
                <Link href="/">
                    <button type="button" className="mx-3 btn btn-outline-primary">
                        홈
                    </button>
                </Link>
                <Link href="/teamlist">
                    <button type="button" className="mx-3 btn btn-outline-primary">
                        팀 목록
                    </button>
                </Link>
                <Link href="/createTeam">
                    <button type="button" className="mx-3 btn btn-outline-primary">
                        팀 생성&가입
                    </button>
                </Link>
            </LinkLayout>
        </>
    )
}

const LinkLayout = styled.div`
    display: flex;
    align-items: center;
`
export default NavBarPageButtons
