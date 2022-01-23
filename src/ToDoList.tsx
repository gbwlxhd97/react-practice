import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

// function ToDoList() {
//     const [toDo,setToDo] = useState("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//         const {currentTarget: {value} } = event;
//         setToDo(value);
//         setToDoError("")
//     }
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         if(toDo.length < 10) {
//             return setToDoError('To Do be longer')
//         }
//         setToDo("")
//     }
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input onChange={onChange} value={toDo} placeholder="Write To Do List!"/>
//                 <button >Add</button>
//                 {toDoError !== "" ? toDoError : null}
//             </form>
//         </div>
//     )
// }

function ToDoList() {
    const {register} = useForm();
    
    return (
        <div>
            <form>
                <input {...register("toDo")} placeholder="write todo list" />
                <button>Add</button>
            </form>
        </div>
    )
}


export default ToDoList