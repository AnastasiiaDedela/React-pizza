import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import PizzaSkeleton from '../components/PizzaItem/PizzaSkeleton';
import PizzaItem from '../components/PizzaItem';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setSortFilter } from '../redux/slices/sortSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const pizzaItems = useSelector((state) => state.pizza.items);
  const dataLoadingStatus = useSelector((state) => state.pizza.status);
  const sortType = useSelector((state) => state.sort.sortType);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : categoryId == 0 ? '' : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
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
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = pizzaItems.map((object) => (
    <Link to={`/pizza/${object.id}`} key={object.id}>
      <PizzaItem {...object} />
    </Link>
  ));
  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {dataLoadingStatus === 'error' ? (
        <div className="cart cart--empty">
          <h2>
            Oops... something went wrong <span>😕</span>
          </h2>
          <p>Please, try again later</p>
        </div>
      ) : (
        <div className="content__items">{dataLoadingStatus === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
