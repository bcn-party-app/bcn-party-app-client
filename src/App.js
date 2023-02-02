import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import PartyListPage from './pages/PartyListPage';
import ClubListPage from './pages/ClubListPage';
import EditPartyPage from './pages/EditPartyPage';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import './App.css';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>}/>
        <Route path='/profile' element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route path='/party' element={ <IsPrivate><PartyListPage /></IsPrivate>} />
        <Route path='/club' element={ <IsPrivate><ClubListPage /></IsPrivate>} />
        <Route path='/party/:partyId/edit' element={<IsPrivate><EditPartyPage /></IsPrivate>} />
      </Routes>
      
    </div>
  );
}

export default App;
