import React from 'react';
import stored from './data'
import LeftPanel from './left'
import TodoListDisplay from './display_list'
import ControlBars from './controls'
import RightHeader from './right_head'
import EditTodo from './edits'


class TodoListApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list : stored.todos,
            projects : stored.projects,
            currentProject: null,
            currentTodo :null,
            isEditingProject :false
        }
    }
    createNewTodo = (todo) => {
        let newlist = [...this.state.list,todo];
        this.setState({list:newlist})
    }
    createNewProject = (newproject)=>{
        let newprojectlist = [...this.state.projects,newproject];
        this.setState({projects : newprojectlist})
    }
    eraseTodo =(id)=>{
        let index=this.state.list.findIndex((todo)=>{
            return todo.id===parseInt(id,10)
        })
        let newlist = [...this.state.list]
        newlist.splice(index,1);
        this.setState({ list : newlist})
    }
    eraseProject = (id)=>{
        let index=this.state.projects.findIndex((project)=>{
            return project.number===parseInt(id,10)
            })
        
        let newTdList = this.state.list.filter((todo)=>{
            return todo.projectNum !== parseInt(id,10)})
        
        let newProjlist = [...this.state.projects]
            newProjlist.splice(index,1);
        this.setState({ list : newTdList,
                        projects : newProjlist,
                        currentProject : null,
                        isEditingProject :false
                        });
        
        
    }
    resetCurrentTodo =()=>{
        this.setState({currentTodo : null})
    }
    cancelProjectEdit = ()=>{
        this.setState({isEditingProject :false})
        if (this.state.currentProject===-1){
            this.setState({currentProject : null})
        }
    }
    //HANDLEEEERS!!!
    handleNewTodoClick=()=>{
        this.setState({
            currentTodo : -1
        })
    }
    handleClickNewProject=()=>{
        this.setState({
            currentProject : -1,
            isEditingProject : true,
            currentTodo :null,
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
    
    handleProjectSelect = (num)=>{
        let newcurr=parseInt(num,10) || null
        this.setState({currentProject : newcurr})
        this.cancelProjectEdit()
    }
    handleProjectEdit = ()=>{
        this.setState({isEditingProject:true})
    }
    handleProjectSave = (newproject) =>{
        let index=this.state.projects.findIndex((project)=>{
            return project.number===newproject.number
        })
        if (index===-1){
            this.createNewProject(newproject)
            }
        else this.setState((state)=>{
            state.projects[index] = newproject
        })
        this.cancelProjectEdit()
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
    handleTodoErase = (event)=>{
        let id=event.target.dataset.id;
        this.eraseTodo(id)
    }
    handleProjectErase=(event)=>{
        let id=event.target.dataset.id;
        this.eraseProject(id)
    }


    /* liveProjectUpdate=(title,number)=>{
        let projectIndex=this.state.projects.findIndex((project)=>{
            return project.number===number
            })
        console.log(projectIndex)
        this.setState((state)=>{
            state.projects[projectIndex].title = title
        })
    } */
    render(){
        let right
        if (this.state.currentTodo===null){
            right = <React.Fragment>
            <RightHeader 
                    projects={this.state.projects}
                    currentProject={this.state.currentProject}
                    isEditingProject={this.state.isEditingProject}
                    onClickEditProject={this.handleProjectEdit}
                    onClickSaveProject={this.handleProjectSave}
                    onClickEraseProject={this.handleProjectErase}
                    onClickCancel={this.cancelProjectEdit}
                    
                        />
            <TodoListDisplay
                    list={this.state.list} 
                    currentProject={this.state.currentProject}
                    selectTodo={this.handleTodoSelect}
                    checkTodo={this.handleTodoCheck}
                    onClickErase={this.handleTodoErase}
                />
                </React.Fragment>
                }
        else {
            right= <React.Fragment>
                <EditTodo 
                currentTodo={this.state.currentTodo}
                list={this.state.list}
                reset = {this.resetCurrentTodo}
                onTodoSave={this.handleTodoSave}
                currentProject={this.state.currentProject}
                checkTodo={this.handleTodoCheck}
                />
            </React.Fragment>
        }
        return (
        <div className='container'>
            <LeftPanel 
                projects={this.state.projects}
                onProjectSelect={this.handleProjectSelect} 
                currentProject={this.state.currentProject}
                reset = {this.resetCurrentTodo}/>
            <div className='right-panel'>
                {right}
            </div>

               {/*  
            <RightPanel list={this.state.list} 
                currentProject={this.state.currentProject}
                projects={this.state.projects}
                currentTodo = {this.state.currentTodo}
                onTodoSelect={this.handleTodoSelect}
                onTodoCheck={this.handleTodoCheck}
                onTodoSave={this.handleTodoSave}
                onProjectEdit={this.handleProjectEdit}
                reset = {this.resetCurrentTodo}
                isEdit= {this.state.isEditingProject}
                liveUpdate={this.liveProjectUpdate}
                />*/}
            <ControlBars 
                onClickNewProject={this.handleClickNewProject}
                onClickNewTodo={this.handleNewTodoClick}/>
            
        </div>
        )
    }
}
export default TodoListApp