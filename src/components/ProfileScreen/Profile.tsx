import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faBowlFood, faStar, faPlus, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../../UI/Card/Card';
import './Profile.scss';
import {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../services/useGlobalState';
import { appState } from '../../services/app-state-service';
import { RecipeList } from '../RecipeList/RecipeList';




export const Profile = () => {

    const [state, setGlobalState] = useGlobalState(appState);
    const [edit, setEdit] = useState(false);
    const [displayName, setDisplayName] = useState(state.currentUser?.displayName);
    const [userDescription, setUserDescription] = useState(state.currentUser?.description);

/*     useEffect(() => {
            state.users.find()
    }, []) */


    
    

    const handleEditMode = () => {
        if (edit) {
            state.currentUser.displayName = displayName;
            state.currentUser.description = userDescription;
            setGlobalState(state.currentUser, '')
        } 
        
    
        
        setEdit(!edit)
    }

    const handleInputChange = (event: any) => {
        console.log('handleInput changed called')
        if (event.target.name === 'displayName') {
            setDisplayName(event.target.value)
        }
        if (event.target.name === 'description') {
            setUserDescription(event.target.value)
        }
    }

    return (
        <div className="profile-page">
            <Card className='profile-page-card'>
                <FontAwesomeIcon icon={edit ? faFloppyDisk : faPenToSquare} className="edit-icon" onClick={handleEditMode} />
                {state.currentUser?.profilePic ? <img /> :
                    <Card width='50px' height='50px' className='add-profile-pic'>
                        <FontAwesomeIcon icon={faCamera} /></Card>}
                {!edit && <><h2>{displayName}</h2>
                    <p>{userDescription}</p></>}
                {edit && <>
                    <form className='form'>
                    <label>Display Name</label>
                    <input name='displayName' value={displayName} onChange={handleInputChange } />
                    <label>Description</label>
                        <textarea name="description" value={userDescription} rows={6} onChange={handleInputChange}  />
                        
                    </form>
                </>}
                

                <div className='action-icons'>
                    <div className='action-icon-container'>
                        <FontAwesomeIcon icon={faBowlFood} fontSize="20" />
                    </div>
                    <div className='action-icon-container'>
                        <FontAwesomeIcon icon={faStar} fontSize="20" /></div>
                    <Link to={'/add-recipe'} className='action-icon-container'>
                        <FontAwesomeIcon icon={faPlus} fontSize="20" /></Link>
                
                
                </div>
            </Card>

            <p>Recent Recipes</p>
            {state.currentUser && state.currentUser?.recipes.length > 0 ? <RecipeList recipes={state.currentUser?.recipes} /> : <Card ><h4>You do not have any recipes</h4></Card>}

        </div>

    )
}