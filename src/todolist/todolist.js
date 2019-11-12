import React from 'react';
class Todo {
    constructor (project,dueDate,priority,name,content) {
        this.checked = false;
        this.id = Date.now();
        this.project = project;
        this.dueDate = dueDate;
        this.priority = priority;
        this.name = name;
        this.content = content
    }
}

class TodoListApp extends React.Component {
    constructor(props){
        super(props);
        let todo1 = new Todo (1,28,'high','prout','faire des prouts')
        let todo2 = new Todo (2,4012,'medium','pouet','manger un ragondin');
        let project1 = {number : 1, name : 'bite'}
        let project2 = {number : 2, name : 'rebite'}
        this.state = {
            projects : [project1,project2],
            list : [todo1,todo2] 
        }
    }
    /* addTodo(obj) {
        let currentlist = this.state.list
        let todo = new Todo (
            obj.project , 
            obj.dueDate,
            obj.priority,
            obj.name,
            obj.content);
        this.setState({
            list : [...currentlist,todo]
        })
    } */
    /* 
    renderTodos(){
        return this.state.list.map((todo)=>{
            return (
                <li key ={todo.id}>
                    name : {todo.name} priority : {todo.priority} 
                </li>
            )
        }
        )
    } */
    
    render(){
        return (
         <div>   
            <div className='App-header'>
            <h1 span='2'>POUET</h1>
            </div>
            <div className='container'>
            
            <LeftPanel projects={this.state.projects}/>
            <RightPanel list={this.state.list}/>
            </div>
        </div>
        )
    }
}

class LeftPanel extends React.Component {
    render(){
        return(
            <div className='left-container'>
                <ProjectList projects={this.props.projects}/>
            </div>
        )
    }
}
class ProjectList extends React.Component {
    
    render(){
        let list=this.props.projects;
        if (list.length===0){
            return (
                <h1>
                    NO PROJECTS!
                </h1>
            )
        }
        else

        return list.map((project)=>{
            return (
                <li key={project.number}>
                {project.number} | {project.name}
                 |<button className='edit project'> edit</button>
                </li>
                
                
            )
        })
    }

        

    
}
class RightPanel extends React.Component {
    render(){
        return (
        <div className='right-container'>
            <div className='todo-display'> <TodoDisplay list={this.props.list}/> </div>
            <div className='right-controls'> <RightCtrls /> </div> 
        </div>
        )
    }
}
class TodoDisplay extends React.Component {
    renderTodos(list){
        return list.map((todo)=>{
            return (
                <li key ={todo.id}>
                    name : {todo.name} priority : {todo.priority} 
                </li>
            )
        }
        )
    }
    render(){
        return(
            <ul>
                {this.renderTodos(this.props.list)}
            </ul>
        )
    } 

}
class RightCtrls extends React.Component {
    render(){
        return(
            <button>ADD NEW</button>
        )
    }
}

class NewTodoForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            content :'',
            project : null,
            number : null,
            priority :'',
            dueDate : null
        }
    }
    submit (event) {
        event.preventDefault()
        console.log(this.state);
        console.log(this.props)
        }
    changeHandler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({
            [name] : val
        })
    }
    render(){
        return (
            <form className="todoform"
            onSubmit={this.submit.bind(this)}>
                name: <input type='text' name='name' onChange={this.changeHandler}></input>
                content : <input type='text' name='content' onChange={this.changeHandler}></input>
                project : <input type='number' name='project' onChange={this.changeHandler}></input>
                duedate : <input type='number' name='number' onChange={this.changeHandler}></input>
                priority: <input type='text' name='priority' onChange={this.changeHandler}></input>
                <button type='submit'>submit</button>
            </form>
        )
    }
}



export default TodoListApp