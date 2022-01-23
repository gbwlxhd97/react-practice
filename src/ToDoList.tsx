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

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
    extraError?: string;
}

function ToDoList() {
    const REX_EMAIL = /^[A-Za-z0-9._%+-]+@naver.com$/;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com",
        },    
    });
    const onValid = (data: IForm) => {
        if(data.password !== data.password1) {
            setError("password1", 
            {message: "password not equal"},
            {shouldFocus: true })
        }
    };
    return (
        <div>
            <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit(onValid)}
            >
            <input
                {...register("email", {
                required: "Email is required",
                pattern: {
                    value: REX_EMAIL,
                    message: "Only naver.com emails allowed",
                },
                })}
                placeholder="Email"
            />
            <span>{errors?.email?.message}</span>
            <input
                {...register("firstName", { required: "write here" })}
                placeholder="First Name"
            />
            <span>{errors?.firstName?.message}</span>
            <input
                {...register("lastName", { required: "write here" })}
                placeholder="Last Name"
            />
            <span>{errors?.lastName?.message}</span>
            <input
                {...register("username", { required: "write here", minLength: 10 })}
                placeholder="Username"
            />
            <span>{errors?.username?.message}</span>
            <input
                {...register("password", { required: "write here", minLength: 5 })}
                placeholder="Password"
            />
            <span>{errors?.password?.message}</span>
            <input
                {...register("password1", {
                required: "Password is required",
                minLength: {
                    value: 5,
                    message: "Your password is too short.",
                },
                })}
                placeholder="Password1"
            />
            <span>{errors?.password1?.message}</span>
            <button>Add</button>
            </form>
        </div>
    );
}
export default ToDoList;