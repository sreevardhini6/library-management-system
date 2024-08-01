
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Students } from './pages/Students'
import { Register } from './pages/Register'
import { Loading } from './components/Loading'
import Navbar from './components/Navbar'
import { AddStudent } from './pages/AddsStudents'
import { AddBook } from './pages/AddBook'
import { Books } from './pages/Books'
import ReturnedBooks from './pages/ReturnedBooks'
import DisplayIssue from './pages/DisplayIssue'
import { UpdateBook } from './pages/UpdataBook'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/addstudent' element={<AddStudent />}  />
          <Route path='/dashboard' element={<Dashboard />}  />
          <Route path='/books' element={<Books />}  />
          <Route path='/students' element={<Students />}  />
          <Route path='/addbook' element={<AddBook />}  />
          <Route path='/displayissue' element={<DisplayIssue />}  />
          <Route path='/returned' element={<ReturnedBooks />}  />
          <Route path='/loading' element={<Loading />}  />
          <Route path="/update-book/:id" element={<UpdateBook  />} />
        </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
