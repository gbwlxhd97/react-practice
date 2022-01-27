import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const toDos = useRecoilValue(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
        currentTarget: { name },
        } = event;
        console.log(name);
        
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id===id)
            const oldToDo = oldToDos[targetIndex];
            const newToDo = {text,id,category:name as any}
            
            console.log(newToDo);
            // oldToDos = [...oldToDos.slice(0,targetIndex),]
            // return [...oldToDos.splice(targetIndex,1,newToDo)];
            return [
                ...oldToDos.slice(0,targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex+1)]
        })
    };
    return (
        <li>
        <span>{text}</span>
        {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
            Doing
        </button>
        )}
        {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
            To Do
            </button>
        )}
        {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
            Done
            </button>
        )}
        </li>
    );
}

export default ToDo;