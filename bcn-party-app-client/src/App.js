import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PartyListPage from './pages/PartyListPage';
import EditPartyPage from './pages/EditPartyPage';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import './App.css';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path='/signup' element={<IsAnon><SignupPage /></IsAnon>}/>
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/party' element={ <IsPrivate><PartyListPage /></IsPrivate>} />
        <Route path='/party/:partyId' element={<IsPrivate><EditPartyPage /></IsPrivate>} />
      </Routes>
      
    </div>
  );
}

export default App;
