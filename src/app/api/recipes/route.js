// /app/api/recipes/route.js or wherever your API is defined

import { recipes } from "../../../db/schema";
import { db } from "../../../db/db";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const datas = await db.select().from(recipes);
    return new Response(JSON.stringify({ recipes: datas }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    let data = await request.json();
    await db.insert(recipes).values(data);

    return new Response(JSON.stringify({ message: "Data inserted successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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
