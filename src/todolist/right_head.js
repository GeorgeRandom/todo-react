import React from 'react';
function RightHeader(props){
    if (props.isEditingProject===false)
        return(
            <ProjectTitle 
            projects={props.projects}
            currentProject={props.currentProject}
            clickEdit={props.onClickEditProject}
            />
            )
    return (
        <EditProject 
        projects={props.projects}
        currentProject={props.currentProject}
        clickSave={props.onClickSaveProject}
        clickCancel={props.onClickCancel}
        clickEraseProject={props.onClickEraseProject}
        />
        )
}




function ProjectTitle(props){
    let titletext = 'FULL LIST';
    let subtitle = '(all the todos)'
    let butt=''
    let p = props.currentProject
    let selectedProject=props.projects.find((project)=>{
        return project.number===p
            }) 
        
    if (p){ 
        titletext = selectedProject.title
        subtitle = selectedProject.desc
        butt= <button onClick={props.clickEdit}>EDIT</button>
    }
    return(
        <div className = 'todo-title'>
        <h1>{titletext}</h1>
        <h3>{subtitle} {butt }</h3>
        </div>
    )
}





class EditProject extends React.Component {
    constructor(props){
        super(props);
        this.createDefault =()=>{
            if (props.currentProject===-1){
                let num = props.projects.reduce((max, p) => {
                    return p.number > max ? p.number : max},1
                    )
                return {
                    title : 'Project Title',
                    desc : 'describe your project here',
                    icon : 0,
                    number : num+1,
                    isNew : true
                    }  
                }
                else{
                    return props.projects.find(
                        (project)=>
                            project.number===props.currentProject
                        )
                }
        }
            
        
        this.current= this.createDefault()
        this.state = {
            title : this.current.title,
            desc : this.current.desc,
            number: this.current.number,
            icon: this.current.icon,
            isNew:this.current.isNew
            }
    }
    
    handleChange = (event) =>{
        
        let key = event.target.name;
        let value = event.target.value
        this.setState((state)=>{
            state[key] = value 
            return state
       })
       /* this.props.liveUpdate(this.state.title, this.state.number) */
    }
    clickSave = () =>{
        let {title,desc,icon,number}=this.state;
        let newproj = {title,desc,icon,number};
        this.props.clickSave(newproj)
       
        
    }
    render(){
        let {title,desc,icon}=this.state
        return(
            
            <div className='edit project-details'>
            <input type='text'
                    className='project title'
                    name='title'
                    value={title}
                    onChange={this.handleChange}
                   >
                </input>
                <textarea
                    className='project-description'
                    name='desc'
                    value={desc}
                    rows={10}
                    onChange={this.handleChange}>
                </textarea>
                <p>icon number{icon}</p>
                <p>{!this.state.isNew && <button 
                    data-id={this.state.number}
                    onClick={this.props.clickEraseProject}>ERASE PROJECT</button>}
                    <button onClick={this.props.clickCancel}>CANCEL</button>
                    <button onClick={this.clickSave}>SAVE</button></p>
            </div>
        )
    }

}




export default RightHeader