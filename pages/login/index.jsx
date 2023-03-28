import styled from 'styled-components'
import Link from 'next/link'
import userStore from '/store/userStore'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Router from 'next/router'

const LoginPage = () => {
    const { setUserName } = userStore()

    const [, setCookie] = useCookies(['token'])
    const handleLoginSubmit = async (e) => {
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

            setCookie('token', jwt, {
                expires: new Date(Date.now() + expiredMs),
            })
            axios.defaults.headers.common['Authorization'] = jwt //or res.data 등...

            if (res.status == 200) {
                Router.push('/')
            }
            setUserName(memberName)
        })
    }

    return (
        <Div>
            <FormLogin className={'loginForm'} onSubmit={handleLoginSubmit}>
                <div className="input-group mb-4" style={{ height: '50px' }}>
                    <span className="input-group-text" id="inputGroup-sizing-default">
                        아이디
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder={'ID'}
                        name={'id'}
                        style={{ fontSize: '1.5em' }}
                    />
                </div>

                <div className="input-group mb-3" style={{ height: '50px' }}>
                    <span className="input-group-text" id="inputGroup-sizing-default">
                        비밀번호
                    </span>
                    <input
                        type="password"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder={'PW'}
                        name={'pw'}
                        style={{ fontSize: '1.5em' }}
                    />
                </div>
                <Layout>
                    <button type="submit" className="btn btn-outline-dark">
                        로그인
                    </button>
                    <Link href={'/signup'}>
                        <button type="button" className="btn btn-outline-secondary">
                            회원가입
                        </button>
                    </Link>
                </Layout>
            </FormLogin>
        </Div>
    )
}
const Div = styled.div``
const FormLogin = styled.form`
    border: 2px solid black;
    border-radius: 10px;
    margin: 10vh 30vw;
    padding: 3vh;
`
const InputId = styled.input``

const InputPw = styled.input``

const SubmitLogin = styled.input``
const Psignup = styled.p`
    border: 1px solid black;
`

const Layout = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 3vh 0;
`
export default LoginPage
