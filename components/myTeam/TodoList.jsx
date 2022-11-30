import Todo from "./Todo";
import Done from "./Done";
import Doing from "./Doing";

const TodoList = () => {
  return (
      <>
        <h1>TodoList</h1>
        <Todo />
        <Doing></Doing>
        <Done></Done>
      </>
  )
}

export default TodoList