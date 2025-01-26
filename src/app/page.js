import Card from "./componentes/Card";

const fetchRecipes = async ()=>{
  try {
    const response = await fetch("http://localhost:3000/api/recipes",{
      cache : "no-store"
    })
    if(!response.ok){
      throw new Error("Failed to fetch data")
    }
    return response.json()
  } catch (error) {
    console.log(error)
    return[]
  }
}

export default async function Home() {
   const {recipes} = await fetchRecipes()
  return (
    <div className="flex flex-wrap ">
      {
        recipes.map((recipe)=>{
          return(
            <Card key={recipe.id} recipe={recipe}/>
          )
        })
      }
    
    <Card/>
    </div>
  );
}
