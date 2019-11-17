import React from 'react';
function ControlBar (props) {
        return (
            <React.Fragment>
                <LeftCtrls clickNewProject={props.onClickNewProject}
                    localstor={props.localstor}/>
                <RightCtrls clickNewTodo={props.onClickNewTodo}
                            toggleDone={props.toggleDone}
                            hideDone={props.hideDone}
                            clickSortByTime={props.sortByTime}/>
            </React.Fragment>
        )
    }


function LeftCtrls(props) {
        return (
            <div className = 'controls left-controls'>
                <button onClick={props.clickNewProject}>New Project</button>
                <button onClick={props.localstor}>local storage (test</button>
            </div>
        )
}
function RightCtrls(props) {

    //add new / back / cancel//
        let toggleText= props.hideDone ? 'show completed tasks': 'hide completed tasks'
        return(
            <div className='controls right-controls'> 
                <button onClick={props.toggleDone}>{toggleText}</button>
                <button onClick={props.clickSortByTime}>sort by time left</button>
            </div>
        )
    
}
export default ControlBar