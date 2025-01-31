"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    subname: "",
    description: "",
  });

  const router = useRouter();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Recipe added successfully!");
      router.push("/"); // Navigate to home page
    } else {
      alert("Failed to add recipe");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleInput} required />
      <input type="text" name="subname" placeholder="Subname" onChange={handleInput} required />
      <textarea name="description" placeholder="Description" onChange={handleInput} required />
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default Form;
