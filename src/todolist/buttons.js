import React from 'react'

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
export default TodoCheckbox