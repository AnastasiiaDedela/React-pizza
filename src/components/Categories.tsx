import { memo } from 'react';
import { useWhyDidYouUpdate } from 'use-why-did-you-update';

type TCategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const categories: string[] = ['All', 'Meat', 'Grill', 'Vegetarian', 'Spacy', 'Closed'];

const Categories: React.FC<TCategoriesProps> = memo(({ value, onClickCategory }) => {
  useWhyDidYouUpdate('Categories', { value, onClickCategory });
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
