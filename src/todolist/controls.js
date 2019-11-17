import React from 'react';
function ControlBar (props) {
        return (
            <React.Fragment>
                <LeftCtrls clickNewProject={props.onClickNewProject}
                    localstor={props.localstor}/>
                <RightCtrls clickNewTodo={props.onClickNewTodo}
                            toggleDone={props.toggleDone}
                            hideDone={props.hideDone}
                            clickSortByTime={props.sortByTime}
                            clickSortByPriority={props.sortByPriority}
                            clickProcrastinate = {props.clickProcrastinate}/>
            </React.Fragment>
        )
    }


function LeftCtrls(props) {
        return (
            <div className = 'controls left-controls'>
                <button onClick={props.clickNewProject}>New Project</button>
                <button onClick={props.localstor}>local storage (test)</button>
            </div>
        )
}
function RightCtrls(props) {
    /* const clickJuguet = ()=>{
        props.juguet(-1)
    }
    const clickUnjug = ()=>{
        props.juguet(1)
    }
    
 */
    //add new / back / cancel//
        let toggleText= props.hideDone ? 'show completed tasks': 'hide completed tasks'
        return(
            <div className='controls right-controls'> 
                <button onClick={props.toggleDone}>{toggleText}</button>
                <button onClick={props.clickSortByTime}>sort by time left</button>
                <button onClick={props.clickSortByPriority}>sort by priority</button>
                <button onClick={props.clickProcrastinate}>PROCRASTINATE</button>
              {/*   <button onClick={clickUnjug}>UN-JUGUETIFY</button> */}
            </div>
        )
    
}
export default ControlBar