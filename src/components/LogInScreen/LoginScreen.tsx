import './LoginScreen.scss';
import { useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faArrowRight} from "@fortawesome/free-solid-svg-icons"
import {colors} from '../../colors'



const LoginScreen = () => {
    const [screenSize, setScreenSize] = useState(getWindowSize());
    const [buttonClick, setButtonClick] = useState('');
    

    const providers = ['google', 'apple', 'instagram', 'facebook']

    useEffect(() => {
        const handleWindowResize = () => {
    setScreenSize(getWindowSize())
        }
        window.addEventListener('resize', handleWindowResize)


        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    return (
        <div className="login-screen" style={{
            backgroundImage: `${screenSize.innerWidth > 500 ?'url("/test-background.png")' : 'url("/background.png")' }`
        }}>
            <div className='title-and-logo'>
            <img src='/logo-white.png' alt='company in white' className="logo" />
                <h1 className='title-text'>Welcome Back!</h1>
                {buttonClick && <span>{ buttonClick} using...</span>}
            </div>
            
            <div className="btn-container">
                {!buttonClick  ?
                <> 
                        <Button backgroundColor={colors['primary-purple']} onClick={() => setButtonClick('sign-in')}>Sign In
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                        <Button backgroundColor='rgba(0,0,0,0)' border="1px solid white" onClick={() => setButtonClick('sign-up')}>Sign Up <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                    </> : 
                    <>
                        
                    <Button backgroundColor='#166FE5'>Facebook <FontAwesomeIcon icon={faArrowRight} /></Button>
                    <Button backgroundColor='#EA4336'>Google <FontAwesomeIcon icon={faArrowRight} /></Button>
                    <Button backgroundColor='black'>Apple <FontAwesomeIcon icon={faArrowRight} /></Button>
                    </>
            }
            </div>
        </div>

    )
}

export default LoginScreen;



const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return {innerHeight, innerWidth}
}