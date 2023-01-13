import './Toolbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHouse, faUser, faBell, faSearch} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

export const Toolbar = () => {
    return (
        <div className='toolbar'>
            <NavLink to="/" className={({isActive}) => {return isActive ? 'icon-container active' :'icon-container' }}>
            <FontAwesomeIcon icon={faHouse} color="white" fontSize={'18'} className="icon"/>
            </NavLink>
            <NavLink  to="/profile" className={({isActive}) => {return isActive ? 'icon-container active' :'icon-container' }} ><FontAwesomeIcon icon={ faUser}  color="white" fontSize={'18'} className="icon" /></NavLink>
            <NavLink to="/notifications" className={({isActive}) => {return isActive ? 'icon-container active' :'icon-container' }}><FontAwesomeIcon icon={ faBell}  color="white" fontSize={'18'} className="icon" /></NavLink>
            <NavLink to="/search" className={({isActive}) => {return isActive ? 'icon-container active' :'icon-container' }}><FontAwesomeIcon icon={ faSearch}  color="white" fontSize={'18'} className="icon" /></NavLink>
        </div>
        
    )
}