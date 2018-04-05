class Recipes extends React.Component {
  
  render(){
    const recipeNameArray = this.props.recipes;
    return (
      <ul className="recipes" >
        {recipeNameArray.map((recipe, id) => <Recipe toggleClass={this.props.toggleClass.bind(this)} remove={this.props.remove.bind(this)} onEdit={this.props.onEdit.bind(this)} key={`${recipe.name}${id}`} recipe={recipe} toggleEdit={this.props.toggleEdit.bind(this)}/>)}
      </ul>
    );
  }
}

class Recipe extends React.Component {
  render(){
    return (
      <li className="recipe" >
        <h3 onClick={this.props.toggleClass.bind(this)} >{this.props.recipe.name}</h3>
        <ul>
          {this.props.recipe.ingredients.map((ingredient, id) => <li key={`${this.props.recipe.name}${ingredient}${id}`}>{ingredient}</li>)}
        </ul>
        <button onClick={this.props.remove.bind(this)}>Delete</button>
        <button onClick={this.props.toggleEdit.bind(this)}>Edit</button>
        {this.props.recipe.edit ? <Edit  onEdit={this.props.onEdit.bind(this)} name={this.props.recipe.name} ingredients={this.props.recipe.ingredients} /> : null}
      </li>
    );
  }
}


class AddRecipe extends React.Component {
  render(){
    return (
      <div>
        <button onClick={this.props.togglePopup.bind(this)}>Add Recipe</button>
        {this.props.popup ? <Popup onAdd={this.props.onAdd.bind(this)} /> : null}
      </div>
    );
  }
}

class Edit extends React.Component {
  render(){
    return (
      <div>
        <label>Name: </label>
        <input defaultValue={this.props.name ? this.props.name : ''} />
        <label>Ingredients: </label>
        <textarea defaultValue={this.props.ingredients ? this.props.ingredients.join(', ') : ''}></textarea>
        <button onClick={this.props.onEdit.bind(this)}>ADD</button>
      </div>
    );
  }
}

class Popup extends React.Component {
  render(){
    return (
      <div>
        <label>Name: </label>
        <input />
        <label>Ingredients: </label>
        <textarea placeholder="comma separated"></textarea>
        <button onClick={this.props.onAdd.bind(this)} >ADD</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [
        {
          name: 'Tomato soup',
          ingredients: ['tomatoes', 'water', 'spices'],
          edit: false
        },
        {
          name: 'Tomato something else',
          ingredients: ['tomatoes', 'water', 'spices'],
          edit: false
        },
        {
          name: 'Tomato shrimp',
          ingredients: ['tomatoes', 'water', 'spices'],
          edit: false
        },
        {
          name: 'Tomato pasta',
          ingredients: ['tomatoes', 'water', 'spices'],
          edit: false
        }
      ],
      showPopup: false
    }
  }

  toggleEdit(e) {
    const recipes = this.state.recipes;
    let id;
    let idArray = recipes.map((recipe, id) => {
      if (recipe.name === e.target.parentNode.firstElementChild.innerHTML) {
        return id;
      }
    })
    idArray.forEach(value => Number.isInteger(value) ? id = value : null)
    recipes[id].edit = !recipes[id].edit
    this.setState({
      recipes
    });
  }

  toggleClass(e) {
    let removeIt;
    if (e.target.parentNode.classList.contains('showMore')) {
      removeIt = true;
    }
    e.target.parentNode.parentNode.childNodes.forEach(li => li.classList.remove('showMore'));
    removeIt ? e.target.parentNode.classList.remove('showMore') : e.target.parentNode.classList.add('showMore');
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onAdd(e) {
    const name = e.target.parentNode.childNodes[1].value
    const ingredients = e.target.parentNode.childNodes[3].value.split(',').map(ingredient => ingredient.trim())
    const recipes = this.state.recipes
    recipes.push({
      name,
      ingredients,
      edit: false
    })
    this.setState({
      recipes,
      showPopup: false
    })
  }

  onEdit(e) {
    const name = e.target.parentNode.childNodes[1].value
    const ingredients = e.target.parentNode.childNodes[3].value.split(',').map(ingredient => ingredient.trim())
    const recipes = this.state.recipes
    let id;
    let idArray = recipes.map((recipe, id) => {
      if (recipe.name === e.target.parentNode.parentNode.firstElementChild.innerHTML) {
        return id;
      }
    })
    idArray.forEach(value => Number.isInteger(value) ? id = value : null)
    recipes[id] = {
      name,
      ingredients,
      edit: false
    }
    this.setState({
      recipes
    })
  }

  remove(e){
    const recipes = this.state.recipes
    let id;
    let idArray = recipes.map((recipe, id) => {
      if (recipe.name === e.target.parentNode.firstElementChild.innerHTML) {
        return id;
      }
    })
    idArray.forEach(value => Number.isInteger(value) ? id = value : null)

    if (Number.isInteger(id)) {
      recipes.splice(id, 1);
    } else {
      return;
    }

    this.setState({
      recipes
    })
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('recipeBook', JSON.stringify(this.state.recipes));
  }

  
  componentWillMount() {
    let retrievedObject = localStorage.getItem('recipeBook');
		if(retrievedObject !== null) {
      let recipes = JSON.parse(retrievedObject);
      this.setState({
        recipes
      })
    }
    
  }
  
  
  render(){
    return (
      <div className="wrapper">
        <Recipes toggleClass={this.toggleClass.bind(this)} remove={this.remove.bind(this)} onEdit={this.onEdit.bind(this)} recipes={this.state.recipes} toggleEdit={this.toggleEdit.bind(this)} popup={this.state.showPopup} />
        <AddRecipe onAdd={this.onAdd.bind(this)} togglePopup={this.togglePopup.bind(this)} popup={this.state.showPopup} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

/* 
local storage,
different way of getting the id of an element(to prevent from getting the wrong  identical item deleted)
styling
*/