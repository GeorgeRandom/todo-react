import React from 'react';
import TodoCheckbox from './buttons'
import { differenceInDays } from 'date-fns'
//REFACTOOOOOR!
//build list
function RenderTodos(props){
    //handler
    const clickTodo = (event) =>{
        let selected = event.target.dataset.id;
        props.handleClickTodo(selected)
    }
    //additional sorting
    const sortByTime = (list)=>{
        let newlist = [...list]
        newlist.sort((a,b)=>((a.timeleft > b.timeleft) || !a.timeleft ) ? 1 : -1)
        return newlist
    }
    const hideDone = (list)=>{
        return list.filter((item)=>item.checked===false)
    }
    //build list
    let listToRender = [...props.list]
    
    //sort it!
    if (props.todoSortingType.sortByTime){
        listToRender= sortByTime(listToRender)
    }
    if (props.todoSortingType.hideDone){
        listToRender = hideDone(listToRender)
    }

    return listToRender.map((todo)=>{
        return (
            <li key ={todo.id}>
                <span>
                <TodoCheckbox
                id={todo.id}
                checked={todo.checked}
                checkTodo={props.checkTodo}
                />
                <button className='todobutton'
                data-id={todo.id}
                onClick={clickTodo}
                >{todo.name} </button> 

                priority : <b>{todo.priority} </b>
                {(todo.timeleft) && <i>{todo.timeleft} days left</i>}

                <button data-id={todo.id}
                onClick={props.handleClickErase}>X</button>
                </span>
                    
            </li>
        )
    }
    )
}

function TodoListDisplay(props) {
    //base return
    if (props.list.length===0){
        return(
            <p>no todos in this project</p>
        )
        }
    //default sorting
    const sortByProj = (list,num)=>{
        if (num === null){return list} else
        return list.filter((item)=>item.projectNum===num)
        }
    
    // timeleft
    const timeLeft=(todo)=>{
            let date = todo.dueDate
            let then
               if (date) {
                   let nowdate=new Date()
                    then=date.split('-')
                    let thendate=new Date(then[0],then[1],then[2])
                   return (differenceInDays(thendate,nowdate))
               }
                else return
            }
    const getTimeLeft=(list)=>{
        return list.map((item)=>{
            item.timeleft=timeLeft(item);
            return item
        })
    }
    //getting propsch, basic sort, adding timeleft
    let newList = [...props.list];
    let sortedList = getTimeLeft(sortByProj(newList , props.currentProject))

return(
    <ul>
    <RenderTodos 
    list={sortedList}
    checkTodo={props.checkTodo}
    todoSortingType={props.todoSortingType}
    //bundle handlers!
    handleClickErase={props.handleClickErase}
    handleClickTodo={props.handleClickTodo}
    />
    <button onClick={props.onClickNewTodo} >ADD NEW</button>
    </ul>
)
}

export default TodoListDisplay