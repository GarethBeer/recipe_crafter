import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import LaunchScreen from './components/LaunchScreen/LaunchScreen';
import LoginScreen from './components/LogInScreen/LoginScreen';
import './styles/App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null)
  const [showLaunchScreen, setShowLaunchScreen] = useState(true)

  useEffect(() => {
    getUserInfo().then((res) => {
      const fakeUser = {
      name: 'Gareth Beer'
    }
      setLoggedIn(res ? true : true);
      setLoggedInUser(fakeUser)
  })
    setTimeout(() => {
      setShowLaunchScreen(false)
    }, 5000)
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
          {loggedIn &&  <Home user={loggedInUser} />}
          {!loggedIn && <LoginScreen /> }  
        </>
    }
      
    </div>
  );
}

export default App;
