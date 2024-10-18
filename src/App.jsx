import './App.css';
import AccountLandingPage from './Components/AccountForm/AccountLanding/AccountLandingPage';
import { UserProvider } from '../Context/userIdetify.Check';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/App/Home/Home';
import Profile from './Components/App/Admin/Profile';

function App() {
    
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountLandingPage />} /> 
          <Route path='/homePage' element={<Home />}></Route>
          <Route path='/profileSection' element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
