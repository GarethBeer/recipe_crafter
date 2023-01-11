import { Card } from '../../UI/Card/Card';
import { Toolbar } from '../Toolbar/Toolbar';
import './Home.scss';

interface Props {
    user: any
}

const Home = ({ user }: Props) => {

    return <div className='home'>
        <div className='home-background-circle' style={{ backgroundImage: "url('/background.png')" }}></div>
        <div className='top-section'>
        <div className='display-name-text'>
            <h2>Hello,</h2>
            <h2>{user.name}!</h2>
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
    
    <Toolbar/>
    </div>
}

export default Home;