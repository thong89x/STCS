import { Home } from './views/Home' 
import { Login } from './views/Login' 
import { SignUp } from './views/SignUp' 
import { NotFound } from './views/NotFound';
import Header from './components/Header';
import {Routes,Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
