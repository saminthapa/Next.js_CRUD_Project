// /app/api/recipes/route.js or wherever your API is defined

import { recipes } from "../../../db/schema";
import { db } from "../../../db/db";
import { eq } from "drizzle-orm";

export async function GET(){
  const datas = await db.select().from(recipes)
  return Response.json({
      recipes : datas
  })
}
export async function POST(request) {
  let data = await request.json();
  try {
    await db.insert(recipes).values(data);
    console.log("Data inserted successfully:", data);  // Debugging log
    return Response.json({
      message: "Data inserted successfully"
    }, {status: 201});
  } catch (error) {
    console.log("Error inserting data:", error); // Debugging log
    return Response.json({
      message: error.message
    }, {status: 500});
  }
}




export async function PUT(request) {
  const { name, subname, description, id } = await request.json();
  try {
    const updatedRecipe = await db
      .update(recipes)
      .set({ name, subname, description })
      .where(eq(recipes.id, id));

    if (updatedRecipe) {
      return Response.json({
        message: "Recipe updated successfully",
      }, { status: 200 });
    }

    return Response.json({
      message: "Failed to update recipe",
    }, { status: 400 });
  } catch (error) {
    return Response.json({
      message: error.message,
    }, { status: 500 });
  }
}
