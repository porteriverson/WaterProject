import { useState, useEffect } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://waterproject-backend.azurewebsites.net/api/water/GetProjectTypes'
        );
        const data = await response.json();
        console.log('Fetched the categories', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching the categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div className="category-list">
        <h5 className="center">Project Types</h5>
        <div className="category-filter">
          {categories.map((cat) => (
            <div key={cat} className="category-item">
              <input
                className="category-checkbox"
                type="checkbox"
                id={cat}
                value={cat}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={cat}> {cat}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
