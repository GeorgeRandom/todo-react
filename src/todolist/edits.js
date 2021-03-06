import React from 'react';


class EditTodo extends React.Component {
    constructor(props){
        super(props);
        this.setEditing =()=>{
            if (this.props.currentTodo===-1){
                return true
                }
            return false
        }
        this.dateId = new Date().getTime()
        
        this.state = {
            editing : this.setEditing(),
            todo : this.findTodo()
            }
        }
    findTodo = ()=>{
        let foundTodo = this.props.list.find(
        ((todo)=>todo.id===this.props.currentTodo)
        )
        if (foundTodo!==-1 && foundTodo){return foundTodo}
            let blank = {
                name : 'New Todo' ,
                content: 'type a description here',
                priority :'low',
                dueDate : new Date().toJSON().slice(0,10),
                projectNum : this.props.currentProject,
                id : this.dateId,
                checked: false
                }
            return blank}
    toggleEdit =()=>{
        let antiedit=!this.state.editing
        this.setState({editing: antiedit});
    }
    handleChange = (event) =>{
        
        let key = event.target.name;
        let value = event.target.value
        this.setState((state)=>{
            state.todo[key] = value 
            return state
       })
        
        
    }
    saveChanges = ()=>{
        this.setState({editing:false})
        this.props.onTodoSave(this.state.todo)
    }
    render(){
        let todo = this.state.todo
        let editing = this.state.editing
        let buttontext= (this.state.editing) ? 'CANCEL' : 'BACK'
        return (
            
            <div className="edit todo-details">
                
                <input type='text'
                    className='todolist title'
                    name='name'
                    value={todo.name}
                    disabled={!editing}
                    onChange={this.handleChange}
                   >
                </input>
                <textarea
                    className='todolist description'
                    name='content'
                    disabled={!editing}
                    value={todo.content}
                    rows={10}
                    onChange={this.handleChange}>
                    </textarea>
                <p>due date:<input 
                        disabled={!editing}
                        type='date'
                        name='dueDate' 
                        value={todo.dueDate}
                        onChange={this.handleChange}
                    ></input>  </p>
                <p>priority:<select 
                            name='priority'
                            value={todo.priority}
                            disabled={!editing}
                            onChange={this.handleChange}>
                        <option value='high'>High</option>
                        <option value='medium'>Medium</option>
                        <option value='low'>Low</option>
                    </select>
                </p>
                
                <p><button onClick={this.props.reset}>{buttontext}</button>
                    <EditSaveButton
                    editing={editing}
                    clickEdit={this.toggleEdit}
                    clickSave={this.saveChanges}
                    />
                    
                </p> 
            </div>
        )
    }
}
function EditSaveButton(props){
    if (props.editing)
        return(
            <button
            onClick={props.clickSave}>SAVE</button>
        )
    return(
        <button onClick={props.clickEdit}>EDIT</button>
    )
}







export default EditTodo
