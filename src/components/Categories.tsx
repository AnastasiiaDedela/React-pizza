import { useState } from 'react';

function Categories() {
  const categories = ['All', 'Meat', 'Grill', 'Vegetarian', 'Spacy', 'Closed'];

  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={value}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
