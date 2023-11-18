import axios from 'axios'
import Router from 'next/router'

const submitCreateTeam = (e) => {
    e.preventDefault()

    const teamName = e.target.teamName.value
    const teamPW = e.target.teamPw.value

    const createTeamData = {
        token: cookie.token,
        teamName: teamName,
        teamPassword: teamPW,
    }

    axios
        .post(process.env.NEXT_PUBLIC_CREATE_TEAM, null, {
            params: createTeamData,
        })
        .then((res) => {
            if (res.status === 200) {
                Router.push('/teamlist')
            }
        })
}

export default submitCreateTeam
