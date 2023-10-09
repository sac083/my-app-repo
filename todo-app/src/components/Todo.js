import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToDoAdd, ToDoDelete, ToDoRemove } from './actions';

function Todo() {
    const [toDoAdd, settoDoAdd] = useState(" ");
    let dispatch = useDispatch();
    let todolist = useSelector((state)=>state.toDoReducer.list);
    console.log(todolist)
    // let updateFunction = (id,ele)=>{
    //   settoDoAdd(ele);
    //   dispatch(ToDoUpdate(id,ele,toDoAdd))
    // }
    console.log(todolist);
  return (
    <div className='todo-main-container'>
    <div className='todo-container'>
    <h1>Todo List</h1>
    <div className='input-div'>
    <input placeholder='Enter todo task' type='text' value={toDoAdd} onChange={(e)=>{settoDoAdd(e.target.value)}}/>
<button onClick={()=>{dispatch(ToDoAdd(toDoAdd))}}>Add</button>
  </div>
  <div className='list-container'>{todolist.map((ele,id)=>{
    return <div key={id}><ul><li className='todo-list'><span className='todo-list-item'>{ele}</span> <span className='delete-btn'><button onClick={()=>(dispatch(ToDoDelete(id,toDoAdd)))}>delete</button></span>
    </li></ul></div>
  })}</div>
  <div><button onClick={()=>{dispatch(ToDoRemove())}}>remove all</button></div>
  </div>
  </div>
  )
}

export default Todo