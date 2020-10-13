import React,{useState} from 'react';
import {v4} from 'uuid'
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from 'lodash';

const item={
  id: v4(),
  name: "Have a client meeting"
}
const item2={
  id: v4(),
  name: "Complete the freelance project"
}
function App() {

  //const [del, setdel] = useState("")

const [text, setText] = useState("")
  const [state, setstate] = useState({
    "todo":{
      title: "Todo",
      items:[item,item2]
    },
    "in-progress":{
      title: "In progress",
      items:[]
    },
    "done":{
      title:"Done",
      items:[]
    }

  })

  const handleDragEnd = ({destination, source})=>{
       
    if(!destination){
      return null
    }

    if(destination.index === source.index && destination.droppableId === source.droppableId)
{
  return null
}

const itemCopy ={...state[source.droppableId].items[source.index]}

setstate(prev=>{
  prev={...prev}
  prev[source.droppableId].items.splice(source.index, 1)
  prev[destination.droppableId].items.splice( destination.index, 0, itemCopy)
  return prev
})

  }

  const addItem=() =>{
    if(text===''){
      return alert("Bro,Type something")
    }
    setstate(prev=>{
      
      
      return {
        ...prev,
      todo:{
        title:"Todo",
        items:[
          {
            id: v4(),
            name: text
          },
          ...prev.todo.items
        ]
      }}
    })
    setText("")
  }

  const add2Item=()=>{
    if(text===''){
      return alert("Bro,Type something")
    }

    setstate(prev=>{
    
      return {
        ...prev,
      irfan:{
        title: text,
        items:[]
      }}
    })
    setText("")

    
    
  }
 return (
    <div className="main">

  <h1>Scrum Board</h1>
  <div className={"additem"} >
          <input  placeholder="Add Task / Add Board" type="text" value={text} onChange={(e)=> setText(e.target.value)} required></input>
           <button className={"addBtn"} onClick={addItem}>Add Task</button>
            <button className={"addBtn"} onClick={add2Item}>Add Board</button>
                            </div>
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data,key)=>{
          return(
            <div key={key} className={"column"} >
              <h2>{data.title}</h2>
              
              <Droppable droppableId={key} >
                {(provided, snapshot)=>{
                  return(
                    <div ref={provided.innerRef} {...provided.droppableProps} className={"droppable-col"} >
                      {data.items.map((el, index)=>{
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided,snapshot)=>{

                              return(
                                <div>
                       <div className={`item ${snapshot.isDragging && "dragging"}`}  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                {el.name}
                             
                              <button  className={"delBtn"} onClick={null}>X</button>
                              </div> 
                                </div>
                              )
                             
                            }}

                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                     
                    </div>
                  )

                }}
              </Droppable>
              
            </div>
          )
        })}

      </DragDropContext>
      </div>
      </div>
    
  );
}

export default App;
