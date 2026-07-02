import Login from "./components/Login";
import Register from "./components/Register"
import Todo from "./components/Todo"
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 

  return (
  

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>

    
  )
}

export default App
