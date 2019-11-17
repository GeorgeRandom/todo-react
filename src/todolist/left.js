import React from 'react';


function LeftHeader(props){
        return (
            <div className='left-header'>
            <h1>LATR</h1>
            <p>efficient procrastinating</p>
            </div>
        )
}

function ProjectList(props){
    const countTodos = (pnum,list)=>{
        let newlist=list.filter((item)=>item.projectNum===pnum)
        return newlist.length
    }
    const clickProject = (event) =>{
        let selected = event.target.dataset.id;
        console.log(parseInt(selected,10))
        props.selectProject(selected)
        props.reset()
    }
    const isSelected =(project)=>{
        if (project.number===props.currentProject)
        {return 'selected project'}
        return 'project'
    }
    let list=props.projects;
    let allbutton = 
        <li>
            <button className='select-all-projects'
                onClick={clickProject}
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
    else return (
        <ul id='project-list'>
            {list.map((project)=>{
                return (
                    <li key={project.number}
                    onClick={clickProject} 
                    data-id = {project.number}
                    className={isSelected(project)}>
                     {project.title}  
                      ({countTodos(project.number,props.list)})
                    </li>
                    )
                })
                }
                {allbutton}
            </ul>
        )    
    
}
function LeftPanel(props) {
    return(
        <div className='left-container'>
            <div className='left-header'>
                <LeftHeader />
            </div>
            <div className='left-display'>
                <ProjectList projects={props.projects}
                    selectProject={props.onProjectSelect} 
                    currentProject={props.currentProject}
                    reset={props.reset}
                    list={props.list}
                />
            </div>
        </div>
    )
}
export default LeftPanel
        

    
