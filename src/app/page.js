import { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("/api/recipes");
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  const handleDelete = (id) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="flex flex-wrap">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} onDelete={handleDelete} />
        ))
      ) : (
        <div>No recipes available. You can create one!</div>
      )}
    </div>
  );
};

export default Home;
