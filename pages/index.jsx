import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Accordion } from 'react-bootstrap'
import leader from '../public/aaa.jpg'
import Image from 'next/image'
import inputteam from '../public/input.png'
import Sockjs from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill'

const Index = () => {
    //--------------------------------------------------------------

    //--------------------------------------------------------------
    return (
        <div>
            <Container>
                <h1>사용방법 안내</h1>
                <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>팀장</Accordion.Header>
                        <Accordion.Body>
                            <h5>1. 팀 이름과 비밀번호를 입력해 생성해주세요.</h5>
                            <Image src={leader} alt={''}></Image>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>팀원</Accordion.Header>
                        <Accordion.Body>
                            <h5>1. 팀 비밀번호를 입력 후 입장하기를 눌러주세요.</h5>
                            <Image src={inputteam} alt={''}></Image>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </div>
    )
}
const H1 = styled.h1``

const H2 = styled.h2`
    margin-left: 2vw;
`

const Container = styled.div`
    padding: 3vw 20vw;
`
export default Index
