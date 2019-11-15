import React from 'react';







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


    countTodos = (pnum,list)=>{
        let newlist=list.filter((item)=>item.projectNum===pnum)
        return newlist.length
    }
    
    clickProject = (event) =>{
        let selected = event.target.dataset.id;
        console.log(parseInt(selected,10))
        this.props.selectProject(selected)
        this.props.reset()
    }
    isSelected =(project)=>{
        if (project.number===this.props.currentProject)
        {return 'selected project'}
        return 'project'
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
            <ul id='project-list'>
                {
                list.map((project)=>{
                    
                return (
                    <li key={project.number}
                    onClick={this.clickProject} 
                    data-id = {project.number}
                    className={this.isSelected(project)}>
                     {project.title}  
                      ({this.countTodos(project.number,this.props.list)})
                    </li>
                    )
                })
                }
                {allbutton}
            </ul>
        )    
    }
}
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
                    list={this.props.list}
                    />
                    </div>
            </div>
        )
    }
}
export default LeftPanel
        

    
