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
        content : 'another very important todo, with quite a very very long description indeed',
        checked : false,        
        },{
        projectNum: 2,
        id : 7,
        dueDate : '25/18/2019',
        priority : 'high',
        name : 'bitouflade',
        content : 'lets bitoufle',
        checked : true,
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
            },{
            number: 42,
            title : 'project #42',
            desc: 'an empty project'    
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
// gros container
class TodoListApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list : stored.todos,
            projects : stored.projects,
            currentProject: null,
            currentTodo :null,
        }
    }
    /* addTodo(obj) {
        let currentProjectlist = this.state.list
        let todo = new Todo (
            obj.project , 
            obj.dueDate,
            obj.priority,
            obj.name,
            obj.content);
        this.setState({
            list : [...currentProjectlist,todo]
        })
    } */
    handleTodoSelect = (num)=>{
        let newcurr=parseInt(num,10) || null;
        this.setState({currentTodo : newcurr})
    }
    resetCurrentTodo =()=>{
        this.setState({currentTodo : null})
    }
    handleProjectSelect = (num)=>{
        let newcurr=parseInt(num,10) || null
        this.setState({currentProject : newcurr})
    }
    handleTodoCheck = (num)=>{
        let tdIndex= this.state.list.findIndex((td)=>{
            return td.id===parseInt(num,10)
        })
       this.setState((state)=>{
            state.list[tdIndex].checked = !state.list[tdIndex].checked 
            return state
       })
    }
    render(){
        return (
        <div className='container'>
            <LeftPanel projects={this.state.projects}
                onProjectSelect={this.handleProjectSelect} 
                currentProject={this.state.currentProject}/>
            <RightPanel list={this.state.list} 
                currentProject={this.state.currentProject}
                projects={this.state.projects}
                currentTodo = {this.state.currentTodo}
                onTodoSelect={this.handleTodoSelect}
                onTodoCheck={this.handleTodoCheck}
                reset = {this.resetCurrentTodo}/>
            <LeftCtrls />
            <RightCtrls /> 
            
        </div>
        )
    }
}
//CTRLS
class LeftCtrls extends React.Component {
    render(){
        return (
            <div className = 'left-ctrls'>
                <button>New Project</button>
            </div>
        )
    }
}
class RightCtrls extends React.Component {
    render(){
        return(
            <div className='right-controls'> 
                <button>ADD NEW</button>
            </div>
        )
    }
}
//PANELS

class LeftPanel extends React.Component {
    
    render(){
        return(
            <div className='left-container'>
                <div className='left-header'>
                    <LeftHeader />

                </div>
                <div className='left-display'>
                    <ProjectList projects={this.props.projects}
                    selectProject={this.props.onProjectSelect} 
                    currentProject={this.props.currentProject}
                    />
                    </div>
            </div>
        )
    }
}

class RightPanel extends React.Component {

    render(){
        let rightcontent
        if(!this.props.currentTodo){
            rightcontent=
            <div className='right-display'> 
                <RightTitle 
                currentProject={this.props.currentProject} 
                projects={this.props.projects}
                />
                <TodoListDisplay list={this.props.list} 
                currentProject={this.props.currentProject}
                selectTodo={this.props.onTodoSelect}
                checkTodo={this.props.onTodoCheck}

                /> 
            </div>
            }
        else {
            rightcontent=
            <div className='right-display'> 
                <ExpandedTodo 
                currentTodo={this.props.currentTodo}
                list={this.props.list}
                reset = {this.props.reset}
                checkTodo={this.props.onTodoCheck}
                />
            </div>
        }

            return (
            <div className='right-container'>
                {rightcontent}
            </div>
        )
    }
}

  
    
//INSIDE LEFT PANEL
class LeftHeader extends React.Component {
    render(){
        return (
            <div className='left-header'>
            <h1>LATR</h1>
            <p>efficient procrastinating</p>
            </div>
        )
    }
}
class ProjectList extends React.Component {

    
    clickProject = (event) =>{
        let selected = event.target.dataset.id;
        console.log(parseInt(selected,10))
        this.props.selectProject(selected)
    }
    
    render(){
        let list=this.props.projects;
        let allbutton = <li>
            <button className='select-all-projects'
            onClick={this.clickProject}
            data-id= {'null'} >
                SELECT ALL
            </button>
        </li>
        if (list.length===0){
            return (
                <h1>
                    NO PROJECTS!
                </h1>
            )
        }
        else

        return (
            <div id='project-list'>
                {
                list.map((project)=>{
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
                {allbutton}
            </div>
        )
        
        
    }

        

    
}
//INSIDE RIGHT PANEL
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
class RightTitle extends React.Component {
    render(){
        let p=this.props.currentProject;
        let titletext = 'FULL LIST';
        let subtitle = 'all the todos'
        if (p) {
            let currentProjectp = this.props.projects.find((proj)=>{
                return (proj.number === p)
                })

            titletext = currentProjectp.title
            subtitle = currentProjectp.desc
        }
        return(
            <div className = 'todo-title'>
            <h1>{titletext}</h1>
            <h3>{subtitle}</h3>
            </div>
        )
    }
}



class ExpandedTodo extends React.Component {
    render(){
        let todo = this.props.list.find(
            ((todo)=>todo.id===this.props.currentTodo)
        )
        return (
            <div className="todo-details">
                <h1>{todo.name}</h1>
                <p>{todo.content}</p>
                <p>date : {todo.dueDate}</p>
                <p>priority:{todo.priority}</p>
                <button onClick={this.props.reset}>BACK</button>
                <TodoCheckbox
                id={todo.id}
                checked={todo.checked}
                checkTodo={this.props.checkTodo}
                />
            </div>
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




/* class NewTodoForm extends React.Component {
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
} */



export default TodoListApp