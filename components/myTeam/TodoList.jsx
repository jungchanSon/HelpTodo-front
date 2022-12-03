import Todo from "./Todo";
import Done from "./Done";
import Doing from "./Doing";
import {useEffect, useState} from "react";
import styled from "styled-components";
import TddCard from "./TddCard";
import AddTddForm from "../../components/myTeam/AddTddForm"
const TodoList = ({todolistId, title, creator, resTodo, resDoing, resDone}) => {

  const [todo, setTodo] = useState()
  const [doing, setDoing] = useState()
  const [done, setDone] = useState()
  const [todoTitle, setTodoTitle] = useState()
  const [todoCreator, setTodoCreator] = useState()

  useEffect(()=>{
    setTodo(resTodo)
    setDoing(resDoing)
    setDone(resDone)
    setTodoTitle(title)
    setTodoCreator(creator)

  }, [])

  if(todo) {
    console.log("resTodo -> ", resTodo)
    console.log("resDoing -> ", resDoing)
    console.log("resDone -> ", resDone)
    console.log("todo -> ", todo)
    console.log("doing -> ", doing)
    console.log("done -> ", done)
  }
  return (
      <>
        <h1>{todoTitle}  -  {todoCreator}</h1>
        <Grid>
          <TodoSection>
            <h3>TODO  <AddTddForm todolistId={todolistId} title={"todo"}></AddTddForm></h3>
            {
              todo ?
                  todo.map((item, key) => (
                      <TddCard ttdData = {item} key={key}></TddCard>
                  )) : null
            }
          </TodoSection>
          <DoingSection>
            <h3>DOING <AddTddForm todolistId={todolistId} title={"doing"}></AddTddForm></h3>
            {
              doing ?
                  doing.map((item, key) =>(
                      <TddCard ttdData = {item} key={key}></TddCard>
                  )) : null
            }
          </DoingSection>
          <DoneSection>
            <h3>DONE <AddTddForm todolistId={todolistId} title={"done"}></AddTddForm></h3>
            {
              done ?
                  done.map((item, key) => (
                      <TddCard ttdData = {item} key={key}></TddCard>
                  )) : null
            }
          </DoneSection>



        </Grid>
      </>
  )
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  border: 1px solid black;
  margin: 3em 0;
`

const TodoSection = styled.div`

`
const DoingSection = styled.div``

const DoneSection = styled.div``
export default TodoList