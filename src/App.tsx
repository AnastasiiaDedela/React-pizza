import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaItem from './components/PizzaItem';

function App() {
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
              <PizzaItem title="Hawaii" price={400} />
              <PizzaItem title="Barbecue" price={350} />
              <PizzaItem title="4 Cheese" price={500} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
