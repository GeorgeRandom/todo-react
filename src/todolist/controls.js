import React from 'react';
class ControlBar extends React.Component{
    render(){
        return (
            <React.Fragment>
                <LeftCtrls clickNewProject={this.props.onClickNewProject}/>
                <RightCtrls clickNewTodo={this.props.onClickNewTodo}
                            toggleDone={this.props.toggleDone}
                            hideDone={this.props.hideDone}
                            clickSortByTime={this.props.sortByTime}/>
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

    //add new / back / cancel//
    render(){
        let toggleText= this.props.hideDone ? 'show completed tasks': 'hide completed tasks'
        return(
            <div className='controls right-controls'> 
                <button onClick={this.props.toggleDone}>{toggleText}</button>
                <button onClick={this.props.clickSortByTime}>sort by time left</button>
            </div>
        )
    }
}
export default ControlBar