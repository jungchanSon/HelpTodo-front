import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import roomList from '../../store/roomList'
import TeamRoomCard from '../../components/teamlist/TeamRoomCard'

const TeamListPage = () => {
    const { myRooms, setMyRooms, rooms, setRooms } = roomList()

    let _myRoomList
    let _roomList
    let userId = null

    const userIdData = {
        userId: userId,
    }
    useEffect(() => {
        axios
            .get(process.env.NEXT_PUBLIC_LOCALURL_BACK + '/team/findMyTeam', { params: userIdData })
            .then((res) => {
                setMyRooms(res.data)
            })
            .catch((e) => {
                console.log(e)
            })

        axios
            .get(process.env.NEXT_PUBLIC_LOCALURL_BACK + '/team/findOtherTeamList', {
                params: userIdData,
            })
            .then((res) => {
                setRooms(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

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

                    <div className="list-group">
                        {myRooms
                            ? myRooms.map((item, key) => (
                                  <TeamRoomCard
                                      userId={userId}
                                      key={key}
                                      name={item.name}
                                      cDate={item.createDate}
                                      creator={item.creator}
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
                    <div className="list-group">
                        {rooms
                            ? rooms.map((item, key) => (
                                  <TeamRoomCard
                                      userId={userId}
                                      key={key}
                                      name={item.name}
                                      cDate={item.createDate}
                                      creator={item.creator}
                                      type={'other'}
                                  />
                              ))
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
