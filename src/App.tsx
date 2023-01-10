import { useEffect, useState } from 'react';
import LaunchScreen from './components/LaunchScreen/LaunchScreen';
import LoginScreen from './components/LogInScreen/LoginScreen';
import './styles/App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoggedIn(true)
    }, 5000)
  }, [])

  return (
    <div className="App">
    {!loggedIn ? <LaunchScreen /> :
      <LoginScreen />}
      
    </div>
  );
}

export default App;
