import React from 'react';
import TodoCheckbox from './buttons'

class TodoListDisplay extends React.Component {
    sortByProj = (list,num)=>{
        if (num === null){return list} else
        return list.filter((item)=>item.projectNum===num)
        }
   
    renderTodos(list, num){
        let sortedList = this.sortByProj(list,num)
        if (sortedList.length===0){
            return(
                <p>no todos in this project</p>
            )
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
                    <b>{todo.name} </b> 
                    priority : <b>{todo.priority} </b>
                    <button data-id={todo.id}
                    onClick={this.clickTodo}>select</button>
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
            </ul>
        )
    } 

}



export default TodoListDisplay