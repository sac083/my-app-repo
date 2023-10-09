let initialState = {
    list : []
}

let toDoReducer = (state = initialState,action)=>{
    console.log(action.payload);
switch (action.type) {
    case "TO_ADD":
        
    return {list : [...state.list, action.payload]};

    case "TO_DELETE":
        state.list.splice(action.payload,1)
    return {list : [...state.list]};

    case "TO_REMOVE":
    return {list : []};
     case "TO_UPDATE":
//         state.list.map((index,item)=>{
// return (action.payload[0]===index)?{list : [...state.list, action.payload[1]]}:{list : [...state.list]};

//         })
        // let updatedList = state.list.map()
        state.list.splice(action.payload[0],1,action.payload[1])
        return {list : [...state.list]}; 
        // const indexToUpdate = action.payload[0];
        // // Create a new list with the updated element
        // const updatedList = [...state.list];
        // updatedList[indexToUpdate] = action.payload[1];
  
        // // Return the updated state
        // return { ...state, list: updatedList };
  
//        state.list.map((index,element)=>{
//            if(index===action.payload[0]){
//             return {list : [state.list.splice(action.payload[0],1,action.payload[1])]}
//            }
//             else{
//             return {list : [...state.list]}
// }
//         })
      // return {list : [...state.list]};
        
        // return {list : [...state.list, action.payload.toDoAdd]};
    default:
        return state;
}
}
export default toDoReducer;