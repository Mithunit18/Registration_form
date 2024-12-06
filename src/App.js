import { Routes, Route } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Registration />} />
      <Route path='/login' element={<Login />} />
    </Routes>

    <ToastContainer/>
    </>
  );
}

export default App;
