import { Recipe } from '../../models/models';
import { RecipeListCard } from '../RecipeListCard/RecipeListCard';
import './RecipeList.scss';

interface Props {
    recipes: Recipe[]
}
export const RecipeList = ({recipes}:Props) => {
    return (
        <div className='recipe-card-list-container'>
            {recipes && recipes.map((recipe: Recipe) => <RecipeListCard recipe={recipe} />)}
        </div>
    )
}