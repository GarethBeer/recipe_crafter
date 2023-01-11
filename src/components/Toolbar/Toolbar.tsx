import './Toolbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHouse, faUser, faBell, faSearch} from '@fortawesome/free-solid-svg-icons';

export const Toolbar = () => {
    return (
        <div className='toolbar'>
            <div className='icon-container active'>
                <FontAwesomeIcon icon={faHouse} color="white" fontSize={'18'} className="icon"/>
            {/*     <span>.</span> */}
            </div>
            <div className='icon-container'><FontAwesomeIcon icon={ faUser}  color="white" fontSize={'18'} className="icon"/></div>
            <div className='icon-container'><FontAwesomeIcon icon={ faBell}  color="white" fontSize={'18'} className="icon" /></div>
            <div className='icon-container'><FontAwesomeIcon icon={ faSearch}  color="white" fontSize={'18'} className="icon" /></div>
        </div>
        
    )
}