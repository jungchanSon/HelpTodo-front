import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import userStore from '../../store/userStore'
import roomData from '../../store/roomData'
import todoTableStore from '../../store/todoTableStore'
import { useCookies } from 'react-cookie'

const TddCard = ({ ttdData, parent }) => {
    const { userId, userName, setUserName, setUserId } = userStore()
    const { teamName, teamCreator, teamCreateDate } = roomData()
    const { todoTableData, setTodoTableData, on_Is_reloadTodoData } = todoTableStore()
    const [cookie] = useCookies(['token'])
    const [detail, setDetail] = useState()

    const clickDeleteTdd = (e) => {
        e.preventDefault()
        const data = {
            teamName: teamName,
            tddId: ttdData.tddId,
        }
        axios
            .delete(process.env.NEXT_PUBLIC_DELETE_TDD_CARD, {
                params: data,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                const reqData = {
                    teamName: teamName,
                }

                axios
                    .post(process.env.NEXT_PUBLIC_ALL_TODOLIST, null, {
                        params: reqData,
                        headers: {
                            Authorization: 'Bearer ' + cookie.token,
                        },
                    })
                    .then((res) => {
                        setTodoTableData(res.data)
                    })
            })
    }

    if (!ttdData) {
        return
    }
    return (
        <div>
            <TddDiv>
                {
                    <Card className={'card border-dark m-3'} style={{}}>
                        <CardHead important={ttdData.important} className={'card-header'}>
                            {ttdData.createDate.slice(0, 10)}
                        </CardHead>
                        <div className={'card-body text-dark'}>
                            <p className={'card-text'}>{ttdData.content}</p>
                        </div>
                        <button type='button' className='btn btn-danger' onClick={clickDeleteTdd}>
                            삭제
                        </button>
                    </Card>
                }
            </TddDiv>
        </div>
    )
}
const TddDiv = styled.div`
  width: 100%;
`
const Card = styled.div``

const CardHead = styled.div`
  background: ${(props) => {
    if (props.important == 0) {
      return '000000'
    } else if (props.important == 1) {
      return '#FFC5D0'
    } else if (props.important == 2) {
      return '#FFB9F0'
    } else if (props.important == 3) {
      return '#FF92B1'
    } else if (props.important == 4) {
      return '#FF5675'
    } else if (props.important == 5) {
      return 'red'
    }
    ;('red')
  }};
`
export default TddCard
