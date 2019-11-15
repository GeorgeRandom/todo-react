
const stored = {todos: [
    {
    projectNum: 1,
    id : 1,
    dueDate : '2019-11-25',
    priority : 'high',
    name : 'first todo',
    content : 'the first todo of the first project',
    checked : false,
    },{
    projectNum : 1,
    id : 2,
    dueDate : '2019-12-25',
    priority : 'medium',
    name : 'second todo',
    content : 'another very important todo, with quite a very very long description indeed',
    checked : false,        
    },{
    projectNum: 2,
    id : 7,
    dueDate : '2020-02-14',
    priority : 'high',
    name : 'yet another todo',
    content : "And this one is checked",
    checked : true,
    },{
    projectNum : 2,
    id: 49,
    dueDate : null,
    priority : null,
    name : 'weird...',
    content : 'weirdly empty',
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
content : 'this todo has no parent project',
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
