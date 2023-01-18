/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '../../UI/Card/Card';
import './Home.scss';
import { useEffect, useState } from 'react';
import { getEventsBlob, sendEvent } from '../../services/api-service';

import { useGlobalState } from '../../services/useGlobalState';
import { appState } from '../../services/app-state-service';
import { AD_USER, Claims, Event } from '../../models/models';
import { isEmptyObject } from '../../UtilitiyFunctions/utility';






const Home = () => {
    const [state, setGlobalState] = useGlobalState(appState);
    const [user, setUser]= useState(state.currentUser)


    const createUser = (ad:AD_USER) => {
        return {
            id: ad.userId,
            type: 'user',
            displayName: ad.userDetails,
            first_name: '',
            last_name: '',
            email: ad.claims.find((claim:Claims) => claim.typ === 'emails')?.val || ad.userDetails
        }
    }

    const handleUserCreation = (ad:AD_USER) => {
        const newUser: any = createUser(ad)
        const data = {
            path: `data:app.users:${ad.userId}`,

            users:[newUser]
        }
        const event = new Event(data)
        sendEvent(event, 'app').then(res => { 
            if (res.status === 200) {
                updateCurrentUser(newUser, true)
                /* updateCurrentUser(data, false) */
            }
        }).catch(err => console.log('err', err))
    }
    
    const updateCurrentUser = (user: any, setCurrentUser:boolean) => {
        if (setCurrentUser) {
            user.pathString = 'currentUser'
        }
        
        setUser(user)
        setGlobalState(user, 'update',false);
    }

    useEffect(() => {
        if (isEmptyObject(state.currentUser)) {
            getUserInfo().then(res => {
                if (res) {
                    getEventsBlob('recipecrafter', 'app').then(response => {
                        console.log(response)
                        const user = response.data?.users?.find((user: any) => user.id === res.userId);
                        if (user) {
                            updateCurrentUser(user, true)
                        } else {
                            console.log('no users')
                            handleUserCreation(res)
                        }
                        }
                    ).catch(err => {
                            console.log('error', err)
                        if (err?.response?.statusText === 'Not Found') {
                        /*     handleUserCreation(res) */
                            }
                        })
                    
            } else {
                console.log('no res - user non in AD')
                }})
        } else {
            console.log(state.currentUser)
            setUser(state.currentUser)
        }
    
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

    return <div className='home'>
        
        <div className='top-section'>
        <div className='display-name-text'>
            <h2>Hello,</h2>
            <h2>{user?.displayName ? `${user.displayName}!` : `Retrieving your data...`}</h2>
        </div>
        <div className="suggestion-card-container">
        <Card height="200px">
                <p>Suggested for you...</p>
        </Card>
        </div>
        </div>
        

        <div className='categories-container'>
            <p>Categories</p>
            <div className='categories-card-container'>
                <Card width="200px" height="100px" className='card'><h4>Dinner</h4></Card>
                <Card width="200px" height="100px"><h4>Dinner</h4></Card>
                <Card width="200px" height="100px"><h4>Dinner</h4></Card>
            </div>
        </div>
    
    
    </div>
}

export default Home;

