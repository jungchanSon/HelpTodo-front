import TeamCard from '../TeamCard'
import roomList from '../../store/roomList'
import userStore from '../../store/userStore'
import { useCookies } from 'react-cookie'
import { useEffect, useRef, useState } from 'react'
import Router from 'next/router'
import axios from 'axios'

const UserTeamList = () => {
    const { myTeams, setMyTeams } = roomList()
    const { userName } = userStore()
    const [cookie] = useCookies(['token'])
    let userId = null

    useEffect(() => {
        if (!cookie.token || !userName) {
            Router.push('/login')
        }
        axios.post(process.env.NEXT_PUBLIC_FIND_MY_TEAM, null, {}).then((res) => {
            setMyTeams(res.data)
        })
    }, [])

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 lg:mx-auto">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                내 팀들
            </h2>
            <ul role="list" className="divide-y divide-gray-100">
                {myTeams
                    ? myTeams.map((room, key) => (
                          <TeamCard
                              name={room.name}
                              key={key}
                              cDate={room.createDate}
                              creator={room.creatorName}
                          />
                      ))
                    : null}
            </ul>
        </div>
    )
}

export default UserTeamList
