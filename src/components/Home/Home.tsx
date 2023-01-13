import { Card } from '../../UI/Card/Card';
import './Home.scss';
import { useEffect } from 'react';
/* import {  sendEvent } from '../../services/api-service'; */

interface Props {
    user: any
}

/* interface Event {
    eventType: string;
    eventTopic: string;
    subject: string;
    eventTime: string;
    data:any
} */



const Home =  ({ user }: Props) =>  {

    useEffect(() => {
        getUserInfo().then(res => {
            
            if (res) {
            console.log(res)
        } else {
            console.log('no res')
            }})
        /*  const result = sendEvent({
             eventType: 'recipecrafter',
             eventTopic:'users.update',
             subject: 'garethbeer',
             id:'123456789875678',
             data: {
                 path:'',
                 id: '123456',
                 type:'user',
                 displayName: 'Gareth Beer',
                 email: 'gareeth.beer1989@outlook.com',
                 first_name: 'Gareth',
                 last_name: 'Beer',
                 recipes: [],
             }
         }, 'test').then(res => console.log(res))
         console.log(result) */
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
        <div className='home-background-circle' style={{ backgroundImage: "url('/background.png')" }}></div>
        <div className='top-section'>
        <div className='display-name-text'>
            <h2>Hello,</h2>
            <h2>{user.userDetails}!</h2>
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

