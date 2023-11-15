import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React, { useState } from 'react'
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';

function App() {
  const [mode, setMode] = useState('light')
  const [alert,setAlert] = useState(null);

  const showAlert = (message,type) =>{  //type is for different types of bootstrap alerts
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const removeBodyClasses = ()=>{
    document.body.classList.remove('bg-light')
    document.body.classList.remove('bg-dark')
    document.body.classList.remove('bg-success')
    document.body.classList.remove('bg-danger')
    document.body.classList.remove('bg-warning')

  }
  const toggleMode = (cls) =>{
    removeBodyClasses();
    document.body.classList.add('bg-'+cls)
    if(mode ==='light'){
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      showAlert("Dark mode has been enabled","success")
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled","success")
    }
  };
  return (
    <>
    <BrowserRouter>
      <Navbar title = "Textlyzer" mode={mode} toggleMode = {toggleMode}/>
      <Alert alert ={alert}/>
      <div className='container my-3'>
      <Routes>
        <Route exact path='/' element={<TextForm showAlert = {showAlert} heading="Enter text to analyze below" mode={mode}/>}/>
        <Route exact path='/about' element={<About mode={mode}/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;