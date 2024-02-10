import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaSkeleton from '../components/PizzaItem/PizzaSkeleton';
import PizzaItem from '../components/PizzaItem';
// import pizzasDetails from './assets/pizzas.json';
import { useEffect, useState } from 'react';

const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setPizzaItems(json);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzaItems.map((object) => <PizzaItem key={object.id} {...object} />)}
      </div>
    </>
  );
};

export default Home;
