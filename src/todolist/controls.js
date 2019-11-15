import React from 'react';
class ControlBar extends React.Component{
    render(){
        return (
            <React.Fragment>
                <LeftCtrls clickNewProject={this.props.onClickNewProject}/>
                <RightCtrls clickNewTodo={this.props.onClickNewTodo}/>
            </React.Fragment>
        )
    }
}

class LeftCtrls extends React.Component {
    render(){
        return (
            <div className = 'controls left-controls'>
                <button onClick={this.props.clickNewProject}>New Project</button>
            </div>
        )
    }
}
class RightCtrls extends React.Component {
    render(){
        return(
            <div className='controls right-controls'> 
                <button onClick={this.props.clickNewTodo} >ADD NEW</button>
            </div>
        )
    }
}
export default ControlBar