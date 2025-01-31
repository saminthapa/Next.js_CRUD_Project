
import Card from "../app/componentes/Card";


const fetchRecipes = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/recipes?timestamp=${new Date().getTime()}`, 
      {
        cache: "no-store", // Ensure fresh data is fetched
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    console.log("Fetched Recipes:", data); // Debugging to check API response
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};



export default async function Home() {
  const recipes = await fetchRecipes(); // Fetch the latest recipes
  console.log(recipes); // Debugging to check if data is fetched correctly

  return (
    <div className="flex flex-wrap">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <p>No recipes available.</p>
          <p>You can create your own from the create button.</p>
        </div>
      )}
    </div>
  );
}


