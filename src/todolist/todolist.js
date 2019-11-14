import React from 'react';

//base
const stored = {todos: [
        {
        projectNum: 1,
        id : 1,
        dueDate : '25/11/2019',
        priority : 'high',
        name : 'first todo',
        content : 'the first todo of the first project',
        checked : false,
        },{
        projectNum : 1,
        id : 2,
        dueDate : '47/21/4078',
        priority : 'medium',
        name : 'second todo',
        content : 'another very important todo',
        checked : false,        
        },{
        projectNum: 2,
        id : 7,
        dueDate : '25/18/2019',
        priority : 'high',
        name : 'bitouflade',
        content : 'lets bitoufle',
        checked : false,
        },{
        projectNum : 2,
        id: 49,
        dueDate : null,
        priority : null,
        name : 'étrange...',
        content : 'un todo étrangement vide',
        checked : false,
        }
        ],
        projects : [{
            number : 1,
            title : "first project",
            desc : "this is the first project"
            },{
            number : 2,
            title : 'second project',
            desc : 'a history of bitoufling'
            }
        ]
}
let lonely = makeTodo({
    name:'lone todo',
    content : 'a lonely todo',
})
stored.todos.push(lonely)
console.log(stored)



    
// fonctions!
function makeTodo({name,
        content,
        dueDate = null,
        priority = null,
        projectNum = 0}){
    return({
        name,
        content,
        dueDate,
        priority,
        projectNum,
        id : Date.now(),
        checked : false
    })
}

class TodoListApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list : stored.todos,
            projects : stored.projects,
            current : null
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

    handleProjectSelect = (num)=>{
        let newcurr=parseInt(num,10)
        this.setState({current : newcurr})
    }
    render(){
        return (
         <div>   
            <div className='App-header'>
            <h1 span='2'>POUET</h1>
            </div>
            <div className='container'>
            
            <LeftPanel projects={this.state.projects}
            onProjectSelect={this.handleProjectSelect} 
            current={this.state.current}/>
            <RightPanel list={this.state.list} 
            current={this.state.current}/>
            </div>
        </div>
        )
    }
}

class LeftPanel extends React.Component {
    
    render(){
        return(
            <div className='left-container'>
                <ProjectList projects={this.props.projects}
                selectProject={this.props.onProjectSelect} 
                current={this.props.current}
                />
            </div>
        )
    }
}
class ProjectList extends React.Component {

    
    clickProject = (event) =>{
        let selected = event.target.dataset.id;
        this.props.selectProject(selected)
    }
    
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
                {project.number} | {project.title} |
                <button className='select-project'
                 onClick={this.clickProject} 
                 data-id = {project.number}
                 > select</button>
                </li>
                
                
            )
        })
    }

        

    
}
class RightPanel extends React.Component {

    render(){
        return (
        <div className='right-container'>
            <div className='todo-display'> 
            <TodoDisplay list={this.props.list} 
            current={this.props.current}
            /> </div>
            <div className='right-controls'> <RightCtrls /> </div> 
        </div>
        )
    }
}
class TodoDisplay extends React.Component {
    sortByProj = (list,num)=>{
        if (num === null){return list} else
        return list.filter((item)=>item.projectNum===num)
    }
    renderTodos(list, num){
        let sortedList = this.sortByProj(list,num)
        return sortedList.map((todo)=>{
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
                {this.renderTodos(this.props.list, this.props.current)}
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