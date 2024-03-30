type TCategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const categories: string[] = ['All', 'Meat', 'Grill', 'Vegetarian', 'Spacy', 'Closed'];

const Categories: React.FC<TCategoriesProps> = ({ value, onClickCategory }) => {
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
};

export default Categories;
