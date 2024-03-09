import { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import PizzaSkeleton from '../components/PizzaItem/PizzaSkeleton';
import PizzaItem from '../components/PizzaItem';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setSortFilter } from '../redux/slices/sortSlice';
import { sortOptions } from '../components/Sort';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const sortType = useSelector((state) => state.sort.sortType);
  const [pizzaItems, setPizzaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = async () => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : categoryId == 0 ? '' : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const res = await axios.get(
      `https://65b69bf5da3a3c16ab00f9b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    setPizzaItems(res.data);
    setIsLoading(false);
  };

  //If first render was, check URL-params and save them in Reduxe --->

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const { sortType, categoryId, currentPage } = params;
      dispatch(
        setFilters({
          categoryId,
          currentPage,
        }),
      );
      dispatch(setSortFilter({ sortType }));
      isSearch.current = true;
    }
  }, []);

  // if params were modified and first render was

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  //If first render was, send request to get pizzas

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
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
