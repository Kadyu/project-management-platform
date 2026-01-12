import './App.css';
import Home from './Components/HomePage/Home';
import { Login } from './Components/LoginPage/Login';
import { Register } from './Components/LoginPage/Register';
import {Route, Routes} from 'react-router-dom';
import Projects from './Components/ProjectsPage/Projects';
import { Create } from './Components/CreatePage/Create';
import { Contact } from './Components/ContactPage/Contact';
import Dashboard from './Components/DashboardPage/Dashboard';
import ChatContent from './Components/DashboardPage/Chat/ChatContent';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/test" element={<ChatContent/>}/>
      </Routes>
    </div>

  );
}

export default App;
