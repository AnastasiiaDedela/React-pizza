import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import PizzaSkeleton from '../components/PizzaItem/PizzaSkeleton';
import PizzaItem from '../components/PizzaItem';
import axios from 'axios';

import { SearchContext } from '../App';
import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
//import { setSortType } from '../redux/slices/sortSlice';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const sortType = useSelector((state) => state.sort.sortType);
  const dispatch = useDispatch();
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  console.log(sortType);

  useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : categoryId == 0 ? '' : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setPizzaItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = pizzaItems.map((object) => <PizzaItem key={object.id} {...object} />);
  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
