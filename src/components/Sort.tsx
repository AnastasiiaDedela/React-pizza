import { useEffect, useRef } from 'react';
import { TSortType, setSortState, setSortType } from '../redux/slices/sortSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

// eslint-disable-next-line react-refresh/only-export-components
export const sortOptions: TSortType[] = ['rating', '-rating', 'price', '-price', 'title', '-title'];

function Sort() {
  const dispatch = useDispatch();

  const sortState = useSelector((state: RootState) => state.sort.sortState);
  const sortType = useSelector((state: RootState) => state.sort.sortType);
  const sortRef = useRef<HTMLDivElement>(null);

  const selectOption = (value: TSortType) => {
    dispatch(setSortType(value));
    dispatch(setSortState(false));
  };

  const tansformSortType = (value: string): string => {
    if (value.startsWith('-')) {
      return value.replace('-', '↓ ');
    } else {
      return '↑ ' + value;
    }
  };

  //eventlistener hanged on body to catch if was click outside the sort and close sort popup, return serves to delete the event listenet when the tage didmount
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //(!event.composedPath().includes(sortRef.current))
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        dispatch(setSortState(false));
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, [dispatch]);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span
          onClick={() => {
            dispatch(setSortState(!sortState));
          }}>
          {tansformSortType(sortType)}
        </span>
      </div>
      {sortState && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((val, index) => (
              <li
                key={index}
                onClick={() => selectOption(val)}
                className={sortType === val ? 'active' : ''}>
                {tansformSortType(val)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
