"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const Form = () => {
  const router = useRouter()
  const [data,setData] = useState({
    name : "",
    subname : "",
    description : ""
  })
  const handleInput =(e)=>{
    const {name,value} = e.target
    setData({
      ...data,
      [name] : value
    })
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
   try {
    const response = await fetch("/api/recipes",{
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    if(!response.ok){
      throw new Error("Failed to add recipe")
    }
    alert("Recipe added successfully")
    router.refresh();
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
    <div className="mt-10 text-center font-bold">lets make it</div>
    <div className="mt-3 text-center text-4xl font-bold">Create Recipe</div>
    <div className="p-8">
    <form onSubmit={handleSubmit}>
    <div className="flex gap-4">
        <input type="Name" name="name" className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" placeholder="Name *" onChange={handleInput}/>
        <input type="text" name="subname" className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm" placeholder="Subname *" onChange={handleInput}/>
      </div>
      <div className="">
        <textarea name="description" id="text" cols="30" rows="10" className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-500" defaultValue="Description of your Recipe" onChange={handleInput}></textarea>
      </div>
      <div className="text-center">
        <button className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">Create Recipe</button>
      </div>
    </form>

     
    </div>
  </div>
  )
}

export default Form