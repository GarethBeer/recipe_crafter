import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import LaunchScreen from './components/LaunchScreen/LaunchScreen';
import LoginScreen from './components/LogInScreen/LoginScreen';
import { Notifications } from './components/NotificationsScreen/Notifications';
import { Profile } from './components/ProfileScreen/Profile';
import { Toolbar } from './components/Toolbar/Toolbar';
import './styles/App.scss';

export interface AD_USER {
  type: string;
  identityProvider: string;
  userDetails: string;
  userRoles: string[];
  claims: Claims[];
  userId: string;
  [index: string]: any;
}
export interface Claims {
  typ: string;
  val: string;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null)
  const [showLaunchScreen, setShowLaunchScreen] = useState(true)

  useEffect(() => {
    getUserInfo().then((res:AD_USER) => {
      if (!res) {
        setLoggedIn(false);
        
      } else {
        setLoggedInUser(res)
        setLoggedIn(true)
      
      }  
  })

    setTimeout(() => {
      setShowLaunchScreen(false)
    }, 3000
  )
  
  }, [])


const getUserInfo = async () => {
    try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;

        if (!clientPrincipal) {
        
            return null;
        } else {
          return clientPrincipal
        }
        
    } catch (error) {
    
        return undefined;
    }
}
  return (
    <div className="App">
      {showLaunchScreen ? <LaunchScreen /> :
        <>
          <Routes>
            <Route path='/' element={loggedIn ? <Home user={loggedInUser} /> : <LoginScreen setLoggedInUser={setLoggedInUser} setLoggedIn={ setLoggedIn} />} ></Route>
            <Route path='/profile' element={<Profile  />} ></Route>
            <Route path='/notifications' element={<Notifications  />}  ></Route>
          </Routes>
          {loggedIn && <Toolbar />}
        </>
    }
      
    </div>
  );
}

export default App;
