import Link from "next/link";

const Card = ({ recipe, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      const response = await fetch(`/api/recipes/${recipe.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(recipe.id); // Call parent to remove from state
        alert("Recipe deleted successfully!");
      } else {
        alert("Failed to delete recipe.");
      }
    }
  };

  return (
    <div className="p-8 m-5 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center">
      <img src="https://loremflickr.com/800/600/girl" className="shadow rounded-lg overflow-hidden border" />
      <div className="mt-8">
        <h4 className="font-bold text-xl">{recipe.name}</h4>
        <p className="mt-2 text-gray-600">{recipe.subname}</p>
        <div className="mt-5">
          <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900">
            {recipe.createdat}
          </button>
          <button onClick={handleDelete} className="mt-3 bg-red-600 text-white p-2 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
