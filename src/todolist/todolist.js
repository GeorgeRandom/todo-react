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
            desc : "this is the first project",
            icon:0,
            },{
            number : 2,
            title : 'second project',
            desc : 'a history of bitoufling',
            icon:2,
            },{
            number: 42,
            title : 'project #42',
            desc: 'an empty project'  ,
            icon:4,  
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
        dueDate = undefined,
        priority = 'low',
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
    createNewTodo = (todo) => {
        let newlist = [...this.state.list,todo];
        this.setState({list:newlist})
    }
    handleNewTodoClick=()=>{
        this.setState({
            currentTodo : -1
        })
    }
    handleTodoSelect = (num)=>{
        let newcurr=parseInt(num,10) || null;
        this.setState({currentTodo : newcurr})
    }
    handleTodoSave =(newtodo)=>{
        let tdIndex= this.state.list.findIndex((todo)=>{
            return todo.id===newtodo.id
            })
        if (tdIndex!==-1)
            this.setState((state)=>{
             state.list[tdIndex] = newtodo
             })
        else this.createNewTodo(newtodo)
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
                currentProject={this.state.currentProject}
                reset = {this.resetCurrentTodo}/>
                
            <RightPanel list={this.state.list} 
                currentProject={this.state.currentProject}
                projects={this.state.projects}
                currentTodo = {this.state.currentTodo}
                onTodoSelect={this.handleTodoSelect}
                onTodoCheck={this.handleTodoCheck}
                onTodoSave={this.handleTodoSave}
                reset = {this.resetCurrentTodo}
                />
            <LeftCtrls />
            <RightCtrls clicknew={this.handleNewTodoClick}/> 
            
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
                <button onClick={this.props.clicknew} >ADD NEW</button>
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
                    reset={this.props.reset}
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
                saveChanges={this.props.onTodoSave}
                currentProject={this.props.currentProject}
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
        this.props.reset()
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
class RightTitle extends React.Component {
    constructor(props){
        super(props);      
        this.state = {
            editing : false,
            currentProj : this.props.currentProject
        }
    }
    saveChanges=()=>{
        console.log('save')
    }
    toggleEdit =()=>{
        let antiedit=!this.state.editing
        this.setState({editing: antiedit});
    }
    render(){
        let titletext = 'FULL LIST';
        let subtitle = 'all the todos'
        let butt=''
        let p = this.props.currentProject
        
        if (p){    
            titletext = this.state.currentProject.title
            subtitle = this.state.currentProject.desc
            butt= <EditSaveButton editing={this.state.editing}
                    clickEdit={this.toggleEdit}
                    clickSave={this.saveChanges}/>
        }
        return(
            <div className = 'todo-title'>
            <h1>{titletext}</h1>
            <h3>{subtitle} {butt }</h3>
            </div>
        )
    }
}

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



class ExpandedTodo extends React.Component {
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
        console.log(this.dateId)
            let blank = {
                name : 'New Todo' ,
                content: 'type a description here',
                priority :'low',
                dueDate : null,
                projectNum : this.props.currentProject,
                id : this.dateId
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
        this.props.saveChanges(this.state.todo)
    }
    render(){
        let todo = this.state.todo
        let editing = this.state.editing
        return (
            
            <div className="todo-details">
                
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
                <p>date : {todo.dueDate}</p>
                <p>priority:<select 
                            name='priority'
                            value={todo.priority}
                            disabled={!editing}
                            onChange={this.handleChange}>
                        <option value='high'>high</option>
                        <option value='medium'>Medium</option>
                        <option value='low'>Low</option>
                    </select>
                </p>
                <TodoCheckbox
                    id={todo.id}
                    checked={todo.checked}
                    checkTodo={this.props.checkTodo}
                    />
                
                <p><button onClick={this.props.reset}>Back</button>
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


export default TodoListApp