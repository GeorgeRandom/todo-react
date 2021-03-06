import React from 'react';
import defaultData from './data'
import LeftPanel from './left'
import TodoListDisplay from './display_list'
import ControlBars from './controls'
import RightHeader from './right_head'
import EditTodo from './edits'
import Procrastinate from './procrastinate'
import { addYears , format, addDays , addMonths, addWeeks } from 'date-fns'

function FirstLoad(){
    if (localStorage.getItem('list')){
        let localProjects = JSON.parse(localStorage.getItem('projects'));
        let localList = JSON.parse(localStorage.getItem('list'));
        return {todos : localList,
            projects:localProjects}
        }
    else return {todos: defaultData.todos,
                projects:defaultData.projects}
}


class TodoListApp extends React.Component {
    constructor(props){
        super(props);
        let load = FirstLoad()
        this.state = {
            list : load.todos,
            projects : load.projects,
            currentProject: null,
            currentTodo :null,
            isEditingProject :false,
            isProcrastinating : false,
            todoSortingType : {hideDone : false,
                            sortByTime : false,
                            sortbyPriority:false}
        }
    }

    //create - destroy
    createNewTodo = (todo) => {
        let newlist = [...this.state.list,todo];
        this.setState({list:newlist})
    }
    createNewProject = (newproject)=>{
        let newprojectlist = [...this.state.projects,newproject];
        this.setState({projects : newprojectlist,
                    currentProject : newproject.number,
                    isEditingProject: false})
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


    //edit state
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
            state.projects[index] = newproject;
            state.isEditingProject = false;
            return state
            })
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

    //procrastination 
    toggleProcrastinate = ()=>{
        this.setState({
            isProcrastinating : !this.state.isProcrastinating
        })

    }

    //sorting, calculs (???
    toggleDone = ()=>{
        this.setState((state)=>{
            state.todoSortingType.hideDone = !this.state.todoSortingType.hideDone
            return state}
        )
    }
    sortByTime = ()=>{
        this.setState((state)=>{
            state.todoSortingType.sortByTime = !this.state.todoSortingType.sortByTime
            return state}
        )
    }
    sortByPriority = ()=>{
        this.setState((state)=>{
            state.todoSortingType.sortByPriority = !this.state.todoSortingType.sortByPriority
            return state}
        )
    }

    //LOCAL STORAGE TEST
    localstor =()=>{
        localStorage.setItem('projects',JSON.stringify(this.state.projects))
        localStorage.setItem('list',JSON.stringify(this.state.list))
        console.log(localStorage)
        }
    
    //  juguet
    juguet = (a)=>{
    const prioMap = {
        'high' : 3,
        'medium' : 2,
        'low' : 1,
        'very low' : 0
        }
    const unMap = ['very low','low','medium','high']
    let newlist = [...this.state.list].map((item)=>{
        let prioval = (prioMap[item.priority] + a);
        if (prioval<0){prioval=0};
        if (prioval>3){prioval=3};
        item.priority = unMap[prioval];
        return item
        })
    this.setState({list : newlist,
           isProcrastinating : false })     
    }

    yordanize = (num,type)=>{
        let baselist=[...this.state.list]
        let newlist = baselist.map((todo)=>{
                if (!todo.dueDate){return todo}
                else {
                    let temp = todo.dueDate.split('-')
                    let date = new Date (temp[0],(temp[1]-1),temp[2])
                    let newdate
                    if (type==='years'){newdate=addYears(date,num)}
                    if (type==='months'){newdate=addMonths(date,num)}
                    if (type==='weeks'){newdate=addWeeks(date,num)}
                    else {newdate = addDays(date,num)}
                    console.log(type)
                    todo.dueDate = format(newdate,'yyyy-MM-dd');
                    return todo
                    }
            })
            
        
        
    this.setState({
        list : newlist,
        isProcrastinating : false })
     
    }
    
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
                    todoSortingType={this.state.todoSortingType}
                    
                    checkTodo={this.handleTodoCheck}
                    handleClickTodo={this.handleTodoSelect}
                    handleClickErase={this.handleTodoErase}
                    onClickNewTodo={this.handleNewTodoClick}
                />
                </React.Fragment>
                }
        else {
            right= <React.Fragment>
                <EditTodo 
                currentTodo={this.state.currentTodo}
                list={this.state.list}
                currentProject={this.state.currentProject}

                reset = {this.resetCurrentTodo}
                onTodoSave={this.handleTodoSave}
                checkTodo={this.handleTodoCheck}
                />
            </React.Fragment>
        }
        return (
    <div className='wrapper'>
       {(this.state.isProcrastinating) &&  <Procrastinate 
                    juguetify = {this.juguet} 
                    yordanize = {this.yordanize}/>}
        <div className='container'>
            
            <LeftPanel 
                projects={this.state.projects}
                list={this.state.list}
                currentProject={this.state.currentProject}

                onProjectSelect={this.handleProjectSelect} 
                reset = {this.resetCurrentTodo}/>
            <div className='right-panel'>
                {right}
            </div>

            <ControlBars 
                hideDone={this.state.todoSortingType.hideDone}

                onClickNewProject={this.handleClickNewProject}
                toggleDone={this.toggleDone}
                sortByTime={this.sortByTime}
                sortByPriority={this.sortByPriority}
                
                clickProcrastinate = {this.toggleProcrastinate}

                localstor={this.localstor}
                />   
        </div>
    </div>
        )
    }
}
export default TodoListApp