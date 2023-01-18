import { Recipe } from '../../models/models';
import { Card } from '../../UI/Card/Card';
import './RecipeListCard.scss';
import { useNavigate } from "react-router-dom";

interface Props {
    recipe: Recipe
}

export const RecipeListCard = ({ recipe }: Props) => {
    const navigate = useNavigate();
    const handleViewingRecipe = () => {
        navigate(`/recipe/${recipe.id}`)
    }
    
    return (
        <Card className='recipe-card' onClick={handleViewingRecipe}>
            <div className='recipe-card-image-container'></div>
            <div className='recipe-card-content-container'>
                <h4>{recipe.name}</h4>
                <p>{recipe.description}</p>
            </div>
            
        </Card>
    )
}