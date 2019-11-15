
const stored = {todos: [
    {
    projectNum: 1,
    id : 1,
    dueDate : '25/11/2019',
    priority : 'high',
    name : 'first todo',
    content : 'the first todo of the first project',
    checked : false,
    },{
    projectNum : 1,
    id : 2,
    dueDate : '47/21/4078',
    priority : 'medium',
    name : 'second todo',
    content : 'another very important todo, with quite a very very long description indeed',
    checked : false,        
    },{
    projectNum: 2,
    id : 7,
    dueDate : '25/18/2019',
    priority : 'high',
    name : 'bitouflade',
    content : "let's bitoufle",
    checked : true,
    },{
    projectNum : 2,
    id: 49,
    dueDate : null,
    priority : null,
    name : 'étrange...',
    content : 'un todo étrangement vide',
    checked : false,
    }
    ],
    projects : [{
        number : 1,
        title : "first project",
        desc : "this is the first project",
        icon:0,
        },{
        number : 2,
        title : 'second project',
        desc : 'a history of bitoufling',
        icon:2,
        },{
        number: 42,
        title : 'project #42',
        desc: 'an empty project'  ,
        icon:4,  
        }
    ]
}
let lonely = makeTodo({
name:'lone todo',
content : 'a lonely todo',
})
stored.todos.push(lonely)
console.log(stored)





// fonctions!
function makeTodo({name,
    content,
    dueDate = undefined,
    priority = 'low',
    projectNum = 0}){
return({
    name,
    content,
    dueDate,
    priority,
    projectNum,
    id : Date.now(),
    checked : false
})
}
export default stored
