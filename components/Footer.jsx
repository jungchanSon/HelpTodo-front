// import React from 'react'
import styled from 'styled-components'

export default function Footer() {
    return (
        <div>
            <Container>
                <p>이름: s</p>
                <p>이메일: rnrmfjc@gmail.com</p>
            </Container>
        </div>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    height: 5vh;
    border: 3px solid black;
`
