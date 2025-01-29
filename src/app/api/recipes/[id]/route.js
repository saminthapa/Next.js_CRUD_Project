import { recipes } from "../../../../db/schema";
import { db } from "../../../../db/db";
import { eq } from "drizzle-orm";

// Fetch a single recipe by id
export async function GET(request, nextData) {
  const id = Number(nextData.params.id);
  try {
    let recipe = await db.select().from(recipes).where(eq(recipes.id, id));
    if (recipe.length == 0) {
      return Response.json({
        message: "No recipe found under this id",
      }, { status: 404 });
    }
    return Response.json({
      message: "Data fetched successfully",
      recipe,
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      message: error.message,
    }, { status: 500 });
  }
}

// Delete a recipe by id
export async function DELETE(request, nextData) {
  const id = Number(nextData.params.id);
  try {
    await db.delete(recipes).where(eq(recipes.id, id));
    return Response.json({
      message: "Data deleted successfully",
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      message: error.message,
    }, { status: 500 });
  }
}
export async function PUT(request, nextData) {
    const id = Number(nextData.params.id);
    const data = await request.json();
  
    try {
      // Check if the recipe exists
      const recipe = await db.select().from(recipes).where(eq(recipes.id, id));
      if (recipe.length === 0) {
        return Response.json({ message: "Recipe not found" }, { status: 404 });
      }
  
      // Update the recipe
      const result = await db
        .update(recipes)
        .set({
          name: data.name,
          subname: data.subname,
          description: data.description,
        })
        .where(eq(recipes.id, id));
  
      // Return success response with proper JSON
      if (result) {
        return Response.json({ message: "Recipe updated successfully" }, { status: 200 });
      } else {
        return Response.json({ message: "Failed to update recipe" }, { status: 500 });
      }
    } catch (error) {
      console.error("Error updating recipe:", error);  // Log error for debugging
      return Response.json({ message: "Server error: " + error.message }, { status: 500 });
    }
  }
  