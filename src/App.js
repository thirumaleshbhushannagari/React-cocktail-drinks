import { useEffect, useState } from "react";
import "./index.css";
const uRL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export default function App() {
  const [drinksdata, setDrinksdata] = useState([]);
  const [searchDrink, setSearchDrink] = useState("");

  const fetchDrinks = async (apiURL) => {
    const response = await fetch(apiURL);
    const { drinks } = await response.json();
    setDrinksdata(drinks);
  };

  const searchedUrl = `${uRL}${searchDrink}`;

  useEffect(() => {
    fetchDrinks(searchedUrl);
  }, [searchedUrl]);

  const handleSearchChange = (e) => {
    setSearchDrink(e.target.value);
  };

  return (
    <div className="App">
      <div className="searchdiv">
        <form>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search drink..."
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <hr />
      <div className="container">
        {drinksdata !== null && drinksdata.length > 0 ? (drinksdata.map((drink) => {
          const { strDrink, strDrinkThumb, idDrink } = drink;
          return (
            <div key={idDrink} className="card">
              <div className="cardImg">
                <img src={strDrinkThumb} alt="" />
              </div>
              <div className="cardTitle">
                <h3>{strDrink}</h3>
              </div>
            </div>
          );
        })) :
        (<h2>No Drinks Found!</h2>)}
      </div>
    </div>
  );
}
