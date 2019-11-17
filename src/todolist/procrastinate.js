import React from 'react';
function Procrastinate (props){
    return (
        <div className = 'procrastinate'>
            <h1>PROCRASTINATE</h1>
            <div className = 'procrastiform'>
            <Yordamode yordanize = {props.yordanize}/>
            <Jugmode juguetify = {props.juguetify}/>
            </div>
            
            
            <button onClick= {props.toggleProcrastinate} className='unprocrast'>UN-PROCRASTINATE!</button>
        </div>
    )
}

class Yordamode extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                type : 'days',
                value : 1,
                late : true
            }
    }
    handleValueChange = (event)=>{
        this.setState({value: event.target.value})
        
    }
    handleTypeChange = (event)=>{
        this.setState({type: event.target.value})

    }
    yordaClick = ()=>{
        let val=this.state.value;
        let type = this.state.type
        this.props.yordanize(val,type)
    }
    render(){
        return(
        <div className='yordaform'>
            <h2>YORDAMODE</h2>
            <p>'ça peut attendre...'</p>
            delay all todos by:
            <div>
                <input 
                    name = 'value'
                    type='number' 
                    value={this.state.value}
                    onChange = {this.handleValueChange}
                    >
                </input>
                <select name='type' value = {this.state.type} onChange={this.handleTypeChange}>
                    <option value='days'>days</option>
                    <option value='weeks'>weeks</option> 
                    <option value='months'>months</option>  
                    <option value='years'>YEARS!!</option>    
                </select>
            </div>
            <button onClick = {this.yordaClick}>YORDANIZE</button>
            {/* 
            <button onClick = {this.yordaClick}>UN-YORDANIZE</button> */}
        </div>
            )
        }
    }

function Jugmode (props){
    function clickJug(){
        props.juguetify(-1)
    }
    function clickUnjug(){
        props.juguetify(1)
    }
    return(
        <div className = 'jugform'>
            <h2>JUGMODE</h2>
            <p>'C'est pas grave...'</p>
            <button onClick={clickJug}>JUGUETIFY</button>
            <button onClick={clickUnjug}>UN-JUGUETIFY</button>
        </div>
    )
}


export default Procrastinate