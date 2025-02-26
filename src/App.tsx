
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ParentComponent from './component/props/parent'
import TodoApp from './component/todo-task/todoTask'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TodoApp />} />
      <Route path="/ParentComponent" element={<ParentComponent />} />
    </Routes>
    
</BrowserRouter>

 
    </>
       
  )
}

export default App
