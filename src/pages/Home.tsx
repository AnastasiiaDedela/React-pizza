import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaSkeleton from '../components/PizzaItem/PizzaSkeleton';
import PizzaItem from '../components/PizzaItem';
// import pizzasDetails from './assets/pizzas.json';
import { useEffect, useState } from 'react';

const Home = () => {
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState('rating');

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(
      `https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzaItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  console.log(sortType);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onClickSortType={(value) => setSortType(value)} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzaItems.map((object) => <PizzaItem key={object.id} {...object} />)}
      </div>
    </div>
  );
};

export default Home;
