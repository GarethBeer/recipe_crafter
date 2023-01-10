import { Card } from '../../UI/Card/Card';
import { Toolbar } from '../Toolbar/Toolbar';
import './Home.scss';

interface Props {
    user: any
}

const Home = ({ user }: Props) => {
    console.log(user)
    return <div className='home'>
        <div className='home-background-circle' style={{ backgroundImage: "url('/background.png')" }}></div>
        <div className='display-name-text'>
            <h2>Hello,</h2>
            <h2>   {user.name}!</h2>
        </div>
        <div className="suggestion-card-container">
        <Card height="200px">
            <p>Suggested for you</p></Card>
        </div>
    
    <Toolbar/>
    </div>
}

export default Home;