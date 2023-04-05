import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import roomList from '../../store/roomList'
import TeamRoomCard from '../../components/teamlist/TeamRoomCard'
import { useCookies } from 'react-cookie'
import userStore from '../../store/userStore'
import Router from 'next/router'

const TeamListPage = () => {
    const { myRooms, setMyRooms, rooms, setRooms } = roomList()
    const { userName } = userStore()
    const [cookie] = useCookies(['token'])
    const inputTeamNameRef = useRef()
    const [inputTeamName, setInputTeamName] = useState('')
    const [teamList, setTeamList] = useState([])
    let userId = null

    useEffect(() => {
        console.log('useE', inputTeamName)
        if (inputTeamName !== '') {
            setTeamList([])
            var tempList = []
            rooms.forEach((item) => {
                if (item.name.toUpperCase().includes(inputTeamName)) {
                    tempList.push(item)
                }
            })
            setTeamList(tempList)
        } else {
            setTeamList(rooms)
        }
    }, [inputTeamName])
    useEffect(() => {
        setTeamList(rooms)
    }, [rooms])
    useEffect(() => {
        if (!cookie.token || !userName) {
            Router.push('/login')
        }
    }, [])

    useEffect(() => {
        axios
            .post(process.env.NEXT_PUBLIC_FIND_MY_TEAM, null, {
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                setMyRooms(res.data)
                console.log('myroom', res.data)
            })
            .catch((e) => {
                console.log(e)
            })
        axios
            .post(process.env.NEXT_PUBLIC_FIND_OTHER_TEAM_LIST, null, {
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                setRooms(res.data)
                setTeamList(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [cookie])

    const handleSearchTeam = (e) => {
        e.preventDefault()
        setInputTeamName(inputTeamNameRef.current.value)
        console.log(inputTeamNameRef.current.value)
    }

    if (rooms) {
        rooms.map((item) => {
            console.log('item', item)
        })
    }
    // if(!session){
    //   return(
    //     <RequestLogin />
    //   )
    // } else
    return (
        <div>
            <TeamlistContainer>
                <TeamList>
                    <h3 style={{ textAlign: 'center' }}>내 팀 목록</h3>
                    <hr />
                    <br />

                    <div className='list-group'>
                        {myRooms
                            ? myRooms.map((item, key) => (
                                <TeamRoomCard
                                    userId={userId}
                                    key={key}
                                    name={item.name}
                                    cDate={item.createDate}
                                    creator={item.creatorName}
                                    type={'mine'}
                                />
                            ))
                            : null}
                    </div>
                </TeamList>

                <TeamList>
                    <h3 style={{ textAlign: 'center' }}>다른 팀들</h3>
                    <hr />
                    <br />
                    <h5 style={{ textAlign: 'center' }}>팀 이름 검색</h5>
                    <form>
                        <div className='input-group mb-3'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='팀 이름'
                                aria-label="Recipient's username"
                                aria-describedby='button-addon2'
                                ref={inputTeamNameRef}
                                onChange={handleSearchTeam}
                            />
                            <button
                                className='btn btn-outline-secondary'
                                type='button'
                                id='button-addon2'>
                                검색
                            </button>
                        </div>
                    </form>
                    <br />
                    <hr />
                    <br />
                    <div className='list-group'>
                        {teamList
                            ? teamList.map((item, key) => {
                                    return (<TeamRoomCard
                                        userId={userId}
                                        key={key}
                                        name={item.name}
                                        cDate={item.createDate}
                                        creator={item.creatorName}
                                        isPassword={item.hasPassword}
                                        type={'other'}
                                    />)
                                },
                            )
                            : null}
                    </div>
                </TeamList>
            </TeamlistContainer>
        </div>
    )
}

const TeamlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CreateTeamCode = styled.div`
  border: 1px solid black;
  margin: 5vh;
  padding: 4vh;
`
const InputTeamCode = styled.div`
  border: 1px solid black;
  margin: 5vh;
  padding: 4vh;
`
const TeamList = styled.div`
  border: 1px solid red;
  margin: 5vh;
  padding: 4vh;
  width: 50%;
`
const H1 = styled.h1``

const H2 = styled.h2`
  margin-left: 2vw;
`

const FormCode = styled.form``
const InputCode = styled.input``
const SubmitCode = styled.input``

export default TeamListPage
