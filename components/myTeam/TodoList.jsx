import Todo from "./Todo";
import Done from "./Done";
import Doing from "./Doing";
import {useEffect, useState} from "react";

const TodoList = ({resTodo, resDoing, resDone}) => {

  const [todo, setTodo] = useState()
  const [doing, setDoing] = useState()
  const [done, setDone] = useState()

  useEffect(()=>{
    setTodo(resTodo)
    setDoing(resDoing)
    setDone(resDone)
  }, [])

  if(todo) {console.log(todo)
  }
  return (
      <>
        <h1>TodoList</h1>
        {
          todo ?
              todo.map((item, key) => (
                  <Todo ttdData = {item} key={key}></Todo>
              )) : null
        }
        {
          doing ?
              doing.map((item, key) =>(
                  <Doing ttdData = {item} key={key}></Doing>
              )) : null
        }
        {
          done ?
              done.map((item, key) => (
                  <Done ttdData = {item} key={key}></Done>
              )) : null
        }
      </>
  )
}

export default TodoList