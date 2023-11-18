import axios from 'axios'
import Router from 'next/router'
import { useCookies } from 'react-cookie'

// 로그인
const submitLoginForm = async (e) => {
    e.preventDefault()

    const input_id = e.target.id.value
    const input_pw = e.target.pw.value

    const loginData = {
        id: input_id,
        pw: input_pw,
    }

    axios.post(process.env.NEXT_PUBLIC_LOGIN, null, { params: loginData }).then((res) => {
        const jwt = res.data.token
        const expiredMs = res.data.expiredMs
        const memberName = res.data.memberName
        //
        // setCookie('token', jwt, {
        //     expires: new Date(Date.now() + expiredMs),
        // })
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt //or res.data 등...
        //
        // if (res.status == 200) {
        //     Router.push('/')
        // }
        // setUserName(memberName)

        return status, jwt, expiredMs, memberName
    })
}

export default submitLoginForm
