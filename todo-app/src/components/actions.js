export let ToDoAdd = (data)=>{
    return {
       type : "TO_ADD",
       payload : data
     }
 }
 export let ToDoDelete = (index)=>{
    return {
       type : "TO_DELETE",
       payload : index
     }
 }
 export let ToDoRemove = ()=>{
    return {
       type : "TO_REMOVE"
     }
    }
    export let ToDoUpdate = ([id, toDoAdd])=>{
       return {
          type : "TO_UPDATE",
          payload :  [id,toDoAdd]
        }
       }