import './App.css';
import AccountLandingPage from './Components/AccountForm/AccountLanding/AccountLandingPage';
import { UserProvider } from '../Context/userIdetify.Check';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/App/Home/Home';

function App() {
    
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AccountLandingPage />} /> 
          <Route path='/homePage' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
