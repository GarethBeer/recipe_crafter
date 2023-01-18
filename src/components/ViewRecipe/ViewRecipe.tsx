import './ViewRecipe.scss';
import { useParams } from 'react-router-dom';
import { Card } from '../../UI/Card/Card';
import { useEffect, useState } from 'react';
import { useGlobalState } from '../../services/useGlobalState';
import { appState } from '../../services/app-state-service';
import { Ingredient, Recipe } from '../../models/models';

export const ViewRecipe = () => {
    const { id } = useParams();
    const [state, setGlobalState] = useGlobalState(appState);
    const [recipe, setRecipe] = useState(state.currentUser.recipes.find((recipe:Recipe)=> recipe.id === id))
    

    useEffect(() => {
      
    
      return () => {
        
      }
    }, [])
    
    return (
        <div className='view-recipe'>
            <Card className='recipe-name-card'>
                <div className="image"></div>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
            </Card>
            <Card className='recipe-ingredients-card'>
                <h5>ingredients</h5>
                {recipe && recipe.ingredients.map((ingredient: Ingredient) => <div className='ingredient-item'>
                    <span>{`${ingredient.amount} ${ingredient.unit}`}</span> <span>{ingredient.ingredient}</span>
                </div>)}
            </Card>
            <Card  className='recipe-methods-card'></Card>
        </div>
    )
}