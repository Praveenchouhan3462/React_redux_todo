
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, Todoprovider } from './context/TodoContext';
import { useEffect, useState } from 'react';
import Todoform from './components/Todoform';
import Todoitem from './components/Todoitem';





function App() {
    const [todos,settodos]=useState([]);

    const addTodo=(todo)=>{
      settodos((prev)=>[{id:Date.now(),...todo},...prev])
    }
    const updateedTodo=(id,todo)=>{
      settodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?todo:prevTodo)))
    }
    const deleteTodo=(id)=>{
      settodos((prev)=>prev.filter((todo)=>todo.id!==id))
    }
    const toggleComplete=(todo)=>{
      settodos((prev)=>prev.map((prevTodo)=>prevTodo.id===todo.id?{...prevTodo,completed:!prevTodo.completed}:prevTodo))
    }

    useEffect(()=>{
      const todos=JSON.parse(localStorage.getItem("todos"))
      if(todos && todos.length)
      {
        settodos(todos)
      }
    },[])

    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos))
    },[todos])
  return (
    <Todoprovider value={{todos,addTodo,updateedTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <Todoform/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {
                          todos.map((todo)=>{
                            return(
                              <div key={todo.id} className='w-full'>
                                <Todoitem todo={todo}/>
                              </div>
                            )
                          })
                        }
                    </div>
                </div>
            </div>
            </Todoprovider>
    // <Router>
    //   <div>
    //     <Routes>

    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
