import Todo from "./Todo";
import Done from "./Done";
import Doing from "./Doing";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import TddCard from "./TddCard";
import AddTddForm from "../../components/myTeam/AddTddForm"
import axios from "axios";
import todoStore from "../../store/todoStore";
import doingStore from "../../store/doingStore";
import doneStore from "../../store/doneStore";
import userStore from "../../store/user";
import roomData from "../../store/roomData";
const TodoList = ({todolistId, title, creator, resTodo, resDoing, resDone}) => {

  const [todo, setTodo] = useState()
  const [doing, setDoing] = useState()
  const [done, setDone] = useState()
  const [todoTitle, setTodoTitle] = useState()
  const [todoCreator, setTodoCreator] = useState()
  const {userId, userName, setUserName, setUserId} = userStore();
  const {roomName, roomCreator, roomCreateDate} = roomData()

  const todoSectionRef = useRef()
  const doingSectionRef = useRef()
  const doneSectionRef = useRef()

  const tddRef = useRef()

  const {todoDatas, setTodoDatas} = todoStore()
  const {doingDatas, setDoingDatas} = doingStore()
  const {doneDatas, setDoneDatas} = doneStore()


  useEffect(()=>{
    setTodo(resTodo)
    setDoing(resDoing)
    setDone(resDone)
    setTodoTitle(title)
    setTodoCreator(creator)

  }, [todoDatas])

  const clickDeleteTodolist = (e) => {
    e.preventDefault()

    const data = {
      todoListId: todolistId
    }
    axios.delete(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/delete", {params: data}).then((res) =>{

      const reqData = {
        userId: userId,
        teamName: roomName,
      }

      axios.post(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/all", null, {params : reqData}).then((res)=>{

        setTodoDatas(res.data)
      })
    })
  }

  const onDropTodoSection = (e) => {
    e.preventDefault()

    const data = {
      tddId: tddRef.current.id,
      tddType: "TODO"
    }
    axios.get(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/change/tddType", {params: data}).then((res) =>{
    })
    todoSectionRef.current.appendChild(tddRef.current)
  }

  const onDropDoingSection = (e) => {
    e.preventDefault()

    const data = {
      tddId: tddRef.current.id,
      tddType: "DOING"
    }
    axios.get(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/change/tddType", {params: data}).then((res) =>{
    })

    doingSectionRef.current.appendChild(tddRef.current)
  }

  const onDropDoneSection = (e) => {
    e.preventDefault()

    const data = {
      tddId: tddRef.current.id,
      tddType: "DONE"
    }
    axios.get(process.env.NEXT_PUBLIC_LOCALURL_BACK+"/todolist/change/tddType", {params: data}).then((res) =>{
    })

    doneSectionRef.current.appendChild(tddRef.current)
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const addRefs = (el, item) => {
    tddRef.current = el.target
  }
  return (
      <div className={"my-4"}>
        <TodolistInfo className={"mx-5"}>
          <h4><b>Todolist ?????? : </b> {todoTitle}
            <button type="button" className="btn btn-danger mx-3" onClick={clickDeleteTodolist}>??????????????? ??????</button>
          </h4>
          <h4><b>????????? ?????? : </b> {todoCreator}</h4>
        </TodolistInfo>
        <Grid>
          <TodoSection
              className={"bg-success bg-gradient p-2 text-dark bg-opacity-10"}
              ref={ todoSectionRef }
              onDragOver={onDragOver}
              onDrop={onDropTodoSection}>
            <H3>TODO  <AddTddForm todolistId={todolistId} title={"todo"}></AddTddForm></H3>
            {
              todo ?
                  todo.map((item, key) => (
                      <div key={key}
                           id={item.tddId}
                           draggable={true}
                           onDragStart={addRefs}>
                        <TddCard ttdData = {item} key={key}
                                  parent = {this}></TddCard>
                      </div>
                  )) : null
            }
          </TodoSection>
          <DoingSection
              className={"bg-danger bg-gradient p-2 text-dark bg-opacity-10"}
              ref={ doingSectionRef }
              onDragOver={onDragOver}
              onDrop={onDropDoingSection}>
            <H3>DOING <AddTddForm todolistId={todolistId} title={"doing"}></AddTddForm></H3>
            {
              doing ?
                  doing.map((item, key) =>(
                      <div key={key}
                           id={item.tddId}
                           draggable={true}
                           onDragStart={addRefs}>
                      <TddCard ttdData = {item} key={key}></TddCard>
                      </div>
                  )) : null
            }
          </DoingSection>
          <DoneSection
              className={"bg-secondary bg-gradient p-2 text-dark bg-opacity-10"}
              ref={ doneSectionRef }
              onDragOver={onDragOver}
              onDrop={onDropDoneSection}>
            <H3>DONE <AddTddForm todolistId={todolistId} title={"done"}></AddTddForm></H3>
            {
              done ?
                  done.map((item, key) => (
                      <div key={key}
                           id={item.tddId}
                           draggable={true}
                           onDragStart={addRefs}>
                      <TddCard ttdData = {item} key={key}></TddCard>
                      </div>
                  )) : null
            }
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
`
const DoingSection = styled.div`
  justify-content: center;
  border-left: 1px dashed black;
  border-right: 1px dashed black;
  text-align: center;
`

const DoneSection = styled.div`
  justify-content: center;
  text-align: center;
`
const H3 = styled.div`
  text-align: center;
`

const TodolistInfo = styled.div`
  display: flex;
  justify-content: space-between;
  
  text-align: center;
  
`
export default TodoList