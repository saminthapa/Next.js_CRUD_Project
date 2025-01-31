"use client"; 

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; 

const EditPage = () => {
  const [data, setData] = useState({
    name: "",
    subname: "",
    description: "",
  });

  const { id } = useParams(); 
  const router = useRouter();

  // Fetch the existing recipe data
  useEffect(() => {
    async function fetchRecipe() {
      if (!id) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recipes/${id}`);
        const result = await response.json();

        if (response.ok) {
          const recipe = result.recipe?.[0]; // Check if the array exists
          if (recipe) {
            setData({
              name: recipe.name || "",
              subname: recipe.subname || "",
              description: recipe.description || "",
            });
          }
        } else {
          console.error("Failed to fetch recipe:", result.message);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }

    fetchRecipe();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Submit the updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          subname: data.subname,
          description: data.description,
        }),
      });

      const result = await response.json();
  
      if (response.ok) {
        alert("Recipe updated successfully!");
        router.push("/");
      } else {
        alert(`Failed to update recipe: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Something went wrong while updating.");
    }
  };

  return (
    <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
      <div className="mt-10 text-center font-bold">Is something missing?</div>
      <div className="mt-3 text-center text-4xl font-bold">Update Recipe</div>
      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Name *"
              value={data?.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="subname"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Subname *"
              value={data?.subname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <textarea
              name="description"
              cols="30"
              rows="10"
              className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-500"
              value={data?.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="text-center">
            <button className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
