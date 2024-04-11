import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './login';
import Poll from './poll';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/poll' element={<Poll />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App