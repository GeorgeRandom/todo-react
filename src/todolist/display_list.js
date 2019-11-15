import React from 'react';
import TodoCheckbox from './buttons'
import { differenceInDays } from 'date-fns'

class TodoListDisplay extends React.Component {
    sortByProj = (list,num)=>{
        if (num === null){return list} else
        return list.filter((item)=>item.projectNum===num)
        }
    timeLeft=(todo)=>{
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
    addTimeLeftToItems=(list)=>{
        return list.map((item)=>{
            item.timeleft=this.timeLeft(item);
            return item
        })
    }

    
   
    renderTodos(list, num){
        let sortedList = this.sortByProj(list,num)
        this.addTimeLeftToItems(sortedList)
        
        if (sortedList.length===0){
            return(
                <p>no todos in this project</p>
            )
            }
        if (this.props.hideDone){
            sortedList=sortedList.filter((item)=>item.checked===false)
            }
        if (this.props.sortByTime){
            sortedList.sort((a,b)=>(a.timeleft > b.timeleft) ? 1 : -1)
            console.table(sortedList)
            }
        
        return sortedList.map((todo)=>{
            return (
                <li key ={todo.id}>
                    <span>
                    <TodoCheckbox
                    id={todo.id}
                    checked={todo.checked}
                    checkTodo={this.props.checkTodo}
                    />
                    <button className='todobutton'
                    data-id={todo.id}
                    onClick={this.clickTodo}
                    >{todo.name} </button> 
                    priority : <b>{todo.priority} </b>
                    {(todo.timeleft) && <i>{todo.timeleft} days left</i>}
                    <button data-id={todo.id}
                    onClick={this.props.onClickErase}>X</button>
                    </span>
                    
                </li>
            )
        }
        )
    }
    
    clickTodo = (event) =>{
            let selected = event.target.dataset.id;
            console.log(event.target)
            this.props.selectTodo(selected)
    }
    render(){
        return(
            <ul>
                {this.renderTodos(this.props.list, this.props.currentProject)}
                <button onClick={this.props.onClickNewTodo} >ADD NEW</button>
            </ul>
        )
    } 

}



export default TodoListDisplay