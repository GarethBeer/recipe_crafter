import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faEdit, faMinus, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import './AddRecipe.scss';
import { Card } from '../../UI/Card/Card';
import { colors} from '../../colors';
import Button from '../../UI/Button/Button';
import { useState } from 'react';
import { Unit, Ingredient, Method, Recipe, User } from '../../models/models';
import { v4 as uuid } from 'uuid';
import { appState } from '../../services/app-state-service';
import { useGlobalState } from '../../services/useGlobalState';
import { addPathsToObjectsTree } from '../../UtilitiyFunctions/utility';


export const AddRecipe = () => {
    const [units, setUnits] = useState<Unit[]>([
        { id: uuid(), unit: 'kg' },
        { id: uuid(), unit: 'lbs' },
        { id: uuid(), unit: 'ounces' },
        { id: uuid(), unit: 'tbsp' },
        { id: uuid(), unit: 'tsp' },
        { id: uuid(), unit: 'cup' },
    ])

    const [recipe, setRecipe] = useState<Recipe>(new Recipe())
    const [state, setGlobalState] = useGlobalState(appState)

    
    const [currentIngredient, setCurrentIngredient] = useState<Ingredient>(new Ingredient());
    const [addIngredientDrawer, setAddIngredientDrawer] = useState<boolean>(false);


    const [currentMethod, setCurrentMethod] = useState<Method>(new Method());
    const [addMethoddrawer, setMethodDrawer] = useState<boolean>(false);


    

    const handleUpdatingRecipe = (event:any) => {
        setRecipe({...recipe, [event.target.name]: event.target.value})
    }

    const saveRecipe = () => {
        console.log(state.currentUser)
        if (!state.currentUser.recipes) {
            console.log('shouldnt be in here')
            state.currentUser.recipes = []
        } 
        state.currentUser.recipes.push(recipe);
    /*     const usrIndex = state.users.findIndex((usr: User) => usr.id === state.currentUser.id);
        state.users[usrIndex] = state.currentUser */
        addPathsToObjectsTree(state);
        setGlobalState(state.currentUser.recipes[state.currentUser.recipes.length -1], '')
        console.log('state', state);

    }

    const handleUpdatingIngredient = (event:any) => {
        setCurrentIngredient({...currentIngredient, [event.target.name]: event.target.value})
    }
    const handleUpdatingMethod = (event:any) => {
        setCurrentMethod({...currentMethod, [event.target.name]: event.target.value})
    }


    const handleAddingIngredient = () => {
        const copy = { ...recipe };
        copy.ingredients.push(currentIngredient)
        setRecipe(copy)
        setCurrentIngredient(new Ingredient())
    }

    const handleAddingMethod = () => {
        const copy = {...recipe};
        copy.methods.push(currentMethod)
        setRecipe(copy)

        const newMethod = new Method()
        newMethod.order = copy.methods.length + 1
        setCurrentMethod(newMethod);
    }

    const handleEditIngredient = (index:any) =>(e:any) => {
        const copy = {...recipe}
        copy.ingredients = copy.ingredients.map((item, i) => {
            if (index === i) {
                return { ...item, [e.target.name]: e.target.value };
            } else {
                return item
            }
        });

        setRecipe(copy)
    }
    const handleEditMethod = (index:any) =>(e:any) => {
        const copy = { ...recipe };
        copy.methods = copy.methods.map((item, i) => {
            if (index === i) {
                return { ...item, [e.target.name]: e.target.value };
            } else {
                return item
            }
        }).sort((a: Method, b: Method) => a.order + b.order);
        setRecipe(copy)
    }

    const editMethodMode = (index: number) => {
        const copy: Recipe = {...recipe};
        copy.methods[index].edit = !copy.methods[index].edit;
        setRecipe(copy);
    }

    const editIngredientMode = (index: number) => {
        const copy: Recipe = {...recipe};
        copy.ingredients[index].edit = !copy.ingredients[index].edit
        setRecipe(copy);
    }



    return (
        <div className='add-recipe'>
            <Card width='85px' height='85px' backgroundColor={`linear-gradient(to bottom right, ${colors['primary-purple']} 45px, ${colors['accent-pink']})`} className="add-picture-card">
                <FontAwesomeIcon icon={faCamera } color="white"/>
            </Card>
            <form className='form'>
                <div className='form-field'>
                    <label>Recipe Name</label>
                    <input placeholder='Recipe Name'value={ recipe.name} onChange={handleUpdatingRecipe } name="name" />
                </div>
                <div className='form-field'>
                    <label>Recipe Description</label>
                    <textarea placeholder="Recipe Description" value={ recipe.description} onChange={handleUpdatingRecipe } name="description"/>
                </div>
            </form>

            <div className="add-ingredients">
                <h2>Ingredients</h2>

                <div className='ingredients-container'>
                    {recipe && recipe.ingredients.map((ing: Ingredient, index: number) => {
                        const ingredient = {...ing} 
                        return (
                        <div className='add-ingredient' key={ingredient.id}>
                        
                                <div className={!ingredient.edit ? 'ingredient-top active-top' : 'ingredient-top '}>
                                    
                            
                                    <span>{`${ingredient.amount}x${ingredient.unit}`}</span>
                                    <span>{ingredient.ingredient}</span>
                        
                                      {!ingredient.edit ?
                            
                                        <FontAwesomeIcon icon={faEdit} onClick={() => editIngredientMode(index)} /> :
                                
                                        <FontAwesomeIcon icon={faSave} onClick={() => editIngredientMode(index)} />}
                                </div>

                        {ingredient.edit && <div className='ingredient-bottom'>

                            <div className='form'>
                                <div className='form-row'>
                                    
                                    <input type='number' className='amount' placeholder='amount' name='amount' value={ingredient.amount} onChange={handleEditIngredient(index)} />
                                    
                                    <span>x</span>
                                    
                                    <select className='' placeholder='Unit' value={ingredient.unit} onChange={handleEditIngredient(index)} name='unit'>
                                        
                                        <option>--unit--</option>
                                                {units && units.map((unit: Unit) => <option key={unit.id} value={unit.unit}>{unit.unit}</option>)}
                                        
                                    </select>
                                </div>
                        
                                <input placeholder='ingredient' type='text' value={ingredient.ingredient} onChange={handleEditIngredient(index)} name='ingredient' />
                            </div>
                        </div>}
                        
                    </div>)
                    })}
                </div>

                <div className='add-ingredient'>
                    <div className={!addIngredientDrawer ? 'ingredient-top active-top' : 'ingredient-top '}>
                    <span>Add Ingredient</span>
                        {!addIngredientDrawer ? <FontAwesomeIcon icon={faPlus} onClick={() => setAddIngredientDrawer(prevState => !prevState) } /> :
                    <FontAwesomeIcon icon={faMinus} onClick={() => setAddIngredientDrawer(prevState => !prevState) } />}
                    </div>

                    { addIngredientDrawer && <div className='ingredient-bottom'>
                        <div className='form'>
                            <div className='form-row'>
                                <input type='number' className='amount' placeholder='amount' name='amount' value={currentIngredient.amount} onChange={handleUpdatingIngredient} />
                                <span>x</span>
                                <select className='' placeholder='Unit' value={ currentIngredient.unit} onChange={handleUpdatingIngredient} name='unit'>
                                    <option>--unit--</option>
                                    {units && units.map((unit: Unit) => <option key={unit.id} value={unit.unit}>{ unit.unit}</option>)}
                            </select>
                        </div>
                        
                        <input placeholder='ingredient' type='text' value={ currentIngredient.ingredient} onChange={handleUpdatingIngredient} name='ingredient' />
                        </div>
                        
                        
                        <Button backgroundColor={colors['primary-purple']} type="button" onClick={handleAddingIngredient}>Add Ingredient</Button>
                    </div>}
                
                </div>
            </div>



            <div className="add-methods">
                <h2>Method</h2>

                <div className='methods-container'>
                    {recipe && recipe.methods.map((method: Method, index: number) => {
                        
                        return (
                        <div className='add-method' key={method.id}>
                        
                                <div className={!method.edit ? 'method-top active-top' : 'method-top '}>
                                    
                            
                                    <span>{`Step ${method.order}`}</span>
                                    <span>{`${method.method.substring(0,30)}...`}</span>
                        
                                      {!method.edit ?
                            
                                        <FontAwesomeIcon icon={faEdit} onClick={() => editMethodMode(index)} /> :
                                
                                        <FontAwesomeIcon icon={faSave} onClick={() => editMethodMode(index)} />}
                                </div>

                        {method.edit && <div className='method-bottom'>

                            <div className='form'>
                                <div className='form-row'>
                                    
                                    <input type='number' className='order' placeholder='order' name='order' value={method.order} onChange={handleEditMethod(index)} />
                                </div>
                        
                                <textarea placeholder='add method instructions'  value={method.method} onChange={handleEditMethod(index)} name='method' />
                            </div>
                        </div>}
                        
                    </div>)
                    })}
                </div>

                <div className='add-method'>
                    <div className={!addMethoddrawer ? 'method-top active-top' : 'method-top '}>
                    <span>Add Method</span>
                        {!addMethoddrawer ? <FontAwesomeIcon icon={faPlus} onClick={() => setMethodDrawer(prevState => !prevState) } /> :
                    <FontAwesomeIcon icon={faMinus} onClick={() => setMethodDrawer(prevState => !prevState) } />}
                    </div>

                    { addMethoddrawer && <div className='method-bottom'>
                        <div className='form'>
                            <div className='form-row'>
                                <input type='number' className='amount' placeholder='order' name='order' value={currentMethod.order} onChange={handleUpdatingMethod} />
                            
                        </div>
                        
                        <textarea placeholder='add instructions' value={ currentMethod.method} onChange={handleUpdatingMethod} name='method' />
                        </div>
                        
                        
                        <Button backgroundColor={colors['primary-purple']} type="button" onClick={handleAddingMethod}>Add Method</Button>
                    </div>}
                
                </div>
            </div>
            <Button backgroundColor={colors['primary-purple']} type='button' disabled={!recipe.name && !recipe.description} onClick={saveRecipe}>Save Recipe</Button>
        </div>
    )
}