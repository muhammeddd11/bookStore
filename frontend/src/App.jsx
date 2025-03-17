import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import ShowBook from "./Pages/ShowBook"
import DeleteBook from "./Pages/deleteBook"
import EditBook from "./Pages/editBook"
import CreateBook from "./Pages/CreateBook"
function App() {
  return <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/book/create" element={<CreateBook/>} />
    <Route path="/book/delete/:id" element={<DeleteBook/>} />
    <Route path="/book/edit/:id" element={<EditBook/>} />
    <Route path="/book/details/:id" element={<ShowBook/>} />
  </Routes>
}

export default App
