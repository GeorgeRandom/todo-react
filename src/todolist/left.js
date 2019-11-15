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
            <div id='project-list'>
                {
                list.map((project)=>{
                return (
                    <li key={project.number}
                    className={this.isSelected(project)}>
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
export default LeftPanel
        

    
