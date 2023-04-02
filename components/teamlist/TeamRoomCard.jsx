import React, { useEffect, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import axios from 'axios'
import roomData from '../../store/roomData'
import Router from 'next/router'
import roomList from '../../store/roomList'
import { useCookies } from 'react-cookie'

const TeamRoomCard = ({ name, cDate, creator, type }) => {
    const { setRoomName, setRoomCreator, setRoomCreateDate } = roomData()
    const { myRooms, setMyRooms, rooms, setRooms } = roomList()
    const [cookie] = useCookies(['token'])
    let userId = null

    const userIdData = {
        userId: userId,
    }
    const clickRoom = (e) => {
        e.preventDefault()
        if (type === 'mine') {
            setRoomName(name)
            setRoomCreateDate(cDate)
            setRoomCreator(creator)

            Router.push('/myteam')
        }
    }
    const enterRoomWithPw = (e) => {
        e.preventDefault()
        const teamPW = e.target.teamPw.value

        const joinTeamData = {
            teamName: name,
            teamPassword: teamPW,
        }
        console.log(name)
        console.log(teamPW)
        axios
            .post(process.env.NEXT_PUBLIC_JOIN_TEAM, null, {
                params: joinTeamData,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                axios
                    .post(process.env.NEXT_PUBLIC_FIND_MY_TEAM, {
                        headers: {
                            Authorization: 'Bearer ' + cookie.token,
                        },
                    })
                    .then((res) => {
                        setMyRooms(res.data)
                    })
                    .catch((e) => {
                        console.log(e)
                    })

                axios
                    .post(process.env.NEXT_PUBLIC_FIND_OTHER_TEAM_LIST, {
                        headers: {
                            Authorization: 'Bearer ' + cookie.token,
                        },
                    })
                    .then((res) => {
                        setRooms(res.data)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            })
    }

    return (
        <div>
            {type === 'mine' ? (
                <div
                    className="list-group-item list-group-item-action my-1 py-4"
                    aria-current="true"
                    onClick={clickRoom}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">팀 이름 : {name}</h5>
                        <small> 생성일 : {cDate.slice(0, 10)}</small>
                    </div>
                    <p className="mb-3"></p>
                    <small>팀장 : {creator}</small>
                    <div className="input-group"></div>
                </div>
            ) : null}
            {type === 'other' ? (
                <div
                    className="list-group-item list-group-item-action my-1 py-4"
                    aria-current="true">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">팀 이름 : {name}</h5>
                        <small> 생성일 : {cDate.slice(0, 10)}</small>
                    </div>
                    <p className="mb-1"></p>
                    <small>팀장 : {creator}</small>
                    <div className="input-group mb-3">
                        <form className="input-group mb-3" onSubmit={enterRoomWithPw}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="방 비밀번호 입력 없을 경우, 공란으로"
                                name={'teamPw'}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="submit"
                                id="button-addon2">
                                {' '}
                                입장
                            </button>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

// 애니메이션 추가하기
const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const BoxRoomPw = styled.form``
const Content = styled.div`
    width: 100px;
    height: 100px;
    background: #00bfb2;
    ${(props) =>
        props.active &&
        css`
            animation: ${boxFade} 2s 1s infinite linear alternate;
        `}
`

const InputPw = styled.input``
export default TeamRoomCard
