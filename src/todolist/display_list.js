import React from 'react';

class TodoListDisplay extends React.Component {
    sortByProj = (list,num)=>{
        if (num === null){return list} else
        return list.filter((item)=>item.projectNum===num)
        }
   
    renderTodos(list, num){
        let sortedList = this.sortByProj(list,num)
        return sortedList.map((todo)=>{
            return (
                <li key ={todo.id}>
                    <span>
                    <TodoCheckbox
                    id={todo.id}
                    checked={todo.checked}
                    checkTodo={this.props.checkTodo}
                    />
                    name : <b>{todo.name} </b> 
                    priority : <b>{todo.priority} </b>
                    <button data-id={todo.id}
                    onClick={this.clickTodo}>edit</button>
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


class TodoCheckbox extends React.Component{
    clickCheck = (event)=>{
        console.log(event.target.dataset.id,event.target);
        this.props.checkTodo(event.target.dataset.id)
        }
    render(){
        return(
        <input type='checkbox' 
            className='todo-checkbox'
            data-id={this.props.id}
            checked = {this.props.checked}
            onChange={this.clickCheck}></input>
            )
    }
}
export default TodoListDisplay