
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Page/Login/Login';
import HomePage from './Page/HomePage/HomePage';
import ManageUser from './Page/ManageUser/ManageUser';
import UserProfile from './Page/UserProfile/UserProfile';
import ManageProduct from './Page/ManageProduct/ManageProduct';
import ManageCategory from './Page/ManageCategory/ManageCategory';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/all-user" element={<ManageUser/>}/>
          <Route path="/user-profile" element={<UserProfile/>}/>
          <Route path="/manage-product" element={<ManageProduct/>}/>
          <Route path="/manage-category" element={<ManageCategory/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
