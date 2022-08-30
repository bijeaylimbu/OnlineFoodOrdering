
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Page/Login/Login';
import HomePage from './Page/HomePage/HomePage';
import ManageUser from './Page/ManageUser/ManageUser';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-user" element={<ManageUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
