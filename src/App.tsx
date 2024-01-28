import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaItem from './components/PizzaItem';
import pizzasDetails from './assets/pizzas.json';

function App() {
  fetch('https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items')
    .then((res) => res.json())
    .then((json) => console.log(json));

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div className="content__items">
              {pizzasDetails.map((object) => (
                <PizzaItem
                  key={object.id}
                  {...object}
                  // title={object.title}
                  // price={object.price}
                  // imageUrl={object.imageUrl}
                  // sizes={object.sizes}
                  // types={object.types}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
