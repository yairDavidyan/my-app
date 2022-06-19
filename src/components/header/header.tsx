import { useState } from "react";

function Header({ categories, filterByCategory }) {
  function selectCategory(event) {
    filterByCategory(event.target.value);
    setCurrentCategory(event.target.value);
  }
  const [currentCategory, setCurrentCategory] = useState("All");

  return (
    <>
      <nav className="product-filter">
        <h1>{currentCategory}</h1>
        <div className="sort">
          <div className="collection-sort">
            <label>Sort by:</label>
            <select onChange={selectCategory}>
              {categories}
              <option value="All">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;
