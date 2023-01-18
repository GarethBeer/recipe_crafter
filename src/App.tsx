import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import LaunchScreen from './components/LaunchScreen/LaunchScreen';
import LoginScreen from './components/LogInScreen/LoginScreen';
import { Notifications } from './components/NotificationsScreen/Notifications';
import { Profile } from './components/ProfileScreen/Profile';
import { Toolbar } from './components/Toolbar/Toolbar';
import './styles/App.scss';
import { appState } from './services/app-state-service';
import { useGlobalState } from './services/useGlobalState';
import { AddRecipe } from './components/AddRecipe/AddRecipe';
import { AD_USER, User } from './models/models';
import { getEventsBlob } from './services/api-service';
import { userState } from './services/user-state-service';
import { ViewRecipe } from './components/ViewRecipe/ViewRecipe';



const tempUser = {
  id:'98765',
  first_name: 'Gareth',
  last_name: 'Beer',
  displayName: 'Gareth Beer',
  email: 'gareth.beer1989@outlook.com',
  description: 'I love to cook, my passion is italian foods such as lasagne'
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLaunchScreen, setShowLaunchScreen] = useState(true)
  const [state, setGlobalState] = useGlobalState(appState)


  useEffect(() => {
    getEventsBlob('recipecrafter', 'app').then((response) => {
      setGlobalState(response.data, 'set')
    })

    if (!loggedIn) {
      getUserInfo().then((res:AD_USER) => {
      if (!res) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }  
  })

  }
  
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
   {(loggedIn && !showLaunchScreen) && <div className='background-circle' style={{ backgroundImage: "url('/background.png')" }}></div>}
      {(!loggedIn && showLaunchScreen) ? <LaunchScreen /> :
        <>
          <Routes>
            <Route path='/' element={loggedIn ? <Home /> : <LoginScreen  />} ></Route>
            <Route path='/profile' element={<Profile />} ></Route>
            <Route path='/notifications' element={<Notifications  />}  ></Route>
            <Route path='/add-recipe' element={<AddRecipe  />}  ></Route>
            <Route path='/recipe/:id' element={<ViewRecipe  />}  ></Route>
          </Routes>
          {loggedIn && <Toolbar />}
        </>
    }
      
    </div>
  );
}

export default App;
