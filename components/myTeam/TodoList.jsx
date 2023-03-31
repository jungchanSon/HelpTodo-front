import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import TddCard from './TddCard'
import AddTddForm from '../../components/myTeam/AddTddForm'
import axios from 'axios'
import todoTableStore from '../../store/todoTableStore'
import doingStore from '../../store/doingStore'
import doneStore from '../../store/doneStore'
import userStore from '../../store/userStore'
import roomData from '../../store/roomData'
import { useCookies } from 'react-cookie'

const TodoList = ({ todolistId, title, creator, resTodo, resDoing, resDone }) => {
    const [cookie] = useCookies(['token'])
    const { roomName, roomCreator, roomCreateDate } = roomData()
    const todoSectionRef = useRef()
    const doingSectionRef = useRef()
    const doneSectionRef = useRef()

    const tddRef = useRef()

    const { todoTableData, setTodoTableData } = todoTableStore()
    useEffect(() => {
        console.log(resTodo)
    }, [])
    const clickDeleteTodolist = (e) => {
        e.preventDefault()

        const data = {
            todoListId: todolistId,
        }
        axios
            .delete(process.env.NEXT_PUBLIC_DELETE_TODOLIST, {
                params: data,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                const reqData = {
                    teamName: roomName,
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

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const setRefs = (e, id) => {
        tddRef.current = e.target
    }

    const changeCardType = (type) => {
        // e.preventDefault()
        const data = {
            tddId: tddRef.current.id,
            tddType: type,
        }
        axios
            .get(process.env.NEXT_PUBLIC_CHANGE_TDD_CARD_TYPE, {
                params: data,
                headers: {
                    Authorization: 'Bearer ' + cookie.token,
                },
            })
            .then((res) => {
                const reqData = {
                    teamName: roomName,
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

    return (
        <div className={'my-4'}>
            <TodolistInfo className={'mx-5'}>
                <h3>
                    <b>Todolist 이름 : </b> {title}
                </h3>
                <h3>
                    <b>생성한 사람 : </b> {creator}
                </h3>
                <button type="button" className="btn btn-danger mx-3" onClick={clickDeleteTodolist}>
                    투두리스트 삭제
                </button>
            </TodolistInfo>
            <Grid>
                <TodoSection
                    className={'bg-success bg-gradient p-2 text-dark bg-opacity-10'}
                    ref={todoSectionRef}
                    onDragOver={onDragOver}
                    onDrop={() => changeCardType('TODO')}>
                    <H3>
                        TODO <AddTddForm todolistId={todolistId} title={'todo'}></AddTddForm>
                    </H3>
                    {resTodo
                        ? resTodo.map((item, key) => (
                              <div
                                  key={key}
                                  id={item.tddId}
                                  draggable={true}
                                  onDragStart={(e) => setRefs(e, e.target)}>
                                  <TddCard ttdData={item} key={key} parent={this}></TddCard>
                              </div>
                          ))
                        : null}
                </TodoSection>
                <DoingSection
                    className={'bg-danger bg-gradient p-2 text-dark bg-opacity-10'}
                    ref={doingSectionRef}
                    onDragOver={onDragOver}
                    onDrop={() => {
                        changeCardType('DOING')
                    }}>
                    <H3>
                        DOING <AddTddForm todolistId={todolistId} title={'doing'}></AddTddForm>
                    </H3>
                    {resDoing
                        ? resDoing.map((item, key) => (
                              <div
                                  key={key}
                                  id={item.tddId}
                                  draggable={true}
                                  onDragStart={(e) => setRefs(e, e.target)}>
                                  <TddCard ttdData={item}></TddCard>
                              </div>
                          ))
                        : null}
                </DoingSection>
                <DoneSection
                    className={'bg-secondary bg-gradient p-2 text-dark bg-opacity-10'}
                    ref={doneSectionRef}
                    onDragOver={onDragOver}
                    onDrop={() => {
                        changeCardType('DONE')
                    }}>
                    <H3>
                        DONE <AddTddForm todolistId={todolistId} title={'done'}></AddTddForm>
                    </H3>
                    {resDone
                        ? resDone.map((item, key) => (
                              <div
                                  key={key}
                                  id={item.tddId}
                                  draggable={true}
                                  onDragStart={(e) => setRefs(e, e.target)}>
                                  <TddCard ttdData={item}></TddCard>
                              </div>
                          ))
                        : null}
                </DoneSection>
            </Grid>
        </div>
    )
}
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    border: 1px solid black;
    margin: 3em 0;
`

const TodoSection = styled.div`
    justify-content: center;
    text-align: center;

    z-index: 100;
`
const DoingSection = styled.div`
    justify-content: center;
    border-left: 1px dashed black;
    border-right: 1px dashed black;
    text-align: center;

    z-index: 100;
`

const DoneSection = styled.div`
    justify-content: center;
    text-align: center;
    z-index: 0;
`
const H3 = styled.div`
    text-align: center;
`

const TodolistInfo = styled.div`
    display: flex;
    justify-content: space-between;

    text-align: center;
`
const Div = styled.div`
    z-index: -10;
`
export default TodoList
