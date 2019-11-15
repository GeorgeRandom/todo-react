import React from 'react';




class RightHeader extends React.Component {
    saveChanges=()=>{
        console.log('save')
    }
    findSelectedProject =()=>{
        
    }
    render(){
        let titletext = 'FULL LIST';
        let subtitle = 'all the todos'
        let butt=''
        let p = this.props.currentProject
        let selectedProject=this.props.projects.find((project)=>{
            return project.number===p
            }) 
        
        if (p){ 
            titletext = selectedProject.title
            subtitle = selectedProject.desc
            butt= <button onClick={this.props.clickEdit}>EDIT</button>
        }
        return(
            <div className = 'todo-title'>
            <h1>{titletext}</h1>
            <h3>{subtitle} {butt }</h3>
            </div>
        )
    }
}
class ProjectEdit extends React.Component {
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
                    number : num+1
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
            icon: this.current.icon
            }
    }
    handleChange = (event) =>{
        
        let key = event.target.name;
        let value = event.target.value
        this.setState((state)=>{
            state[key] = value 
            return state
       })
       this.props.liveUpdate(this.state.title, this.state.number)
    }
    render(){
        let {title,desc,icon}=this.state
        return(
            
            <div className='edit-project'>
            <input type='text'
                    className='project title'
                    name='title'
                    value={title}
                    onChange={this.handleChange}
                   >
                </input>
                <textarea
                    className='project description'
                    name='desc'
                    value={desc}
                    rows={10}
                    onChange={this.handleChange}>
                </textarea>
                <p>icon number{icon}</p>
                <p><button>CANCEL</button>
                    <button>SAVE</button></p>
            </div>
        )
    }

}






export default RightHeader