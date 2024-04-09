import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from '../Login/Login.jsx';
import { Poll } from '../Poll/Poll.jsx';

import './App.css'

const App = () => {
  return (
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/poll' element={<Poll />}></Route>
        </Routes>
        </BrowserRouter>
      </div>
  )
}
export default App
