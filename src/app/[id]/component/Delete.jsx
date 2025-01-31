"use client"

import { useRouter } from "next/navigation"

const DeleteButton = ({recipeId}) =>{
    const router = useRouter()
    const deleteRecipe = async ()=> {
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/recipes`    + recipeId,{
            method : "DELETE"
        })
        if(!response.ok){
            throw new Error("Failed to fetch data")
        }
        alert("Recipe deleted successfully")
        router.push("/")
    }
  return (
    <button className="w-full bg-red-700 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-red-500 dark:hover:bg-gray-600" onClick={deleteRecipe}>Delete</button>
  )
}

export default DeleteButton
