import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './authentication/Login';
import { Signup } from './authentication/Signup';
import { Visitor } from './Componentes/Visitor';
import { UserSigned } from './Componentes/SignedinUser';

function App() {
  return (
    <div className="App">
      {
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Visitor />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </>
      }
    </div>
  );
}

export default App;
