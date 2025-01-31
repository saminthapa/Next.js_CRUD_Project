import { db } from "../../../../db/db"; // Ensure you're importing the correct database connection
import { recipes } from "../../../../db/schema"; // Import the schema for recipes
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(recipes); // Fetch all recipes
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { name, subname, description } = await request.json();
  
  try {
    // Insert new recipe into the database
    await db.insert(recipes).values({
      name,
      subname,
      description,
    });

    return Response.json({ message: "Recipe added successfully!" }, { status: 201 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    // Delete recipe by ID
    await db.delete(recipes).where(eq(recipes.id, id));

    return Response.json({ message: "Recipe deleted successfully!" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, subname, description } = await request.json();

  try {
    // Update the recipe by ID
    await db.update(recipes).set({ name, subname, description }).where(eq(recipes.id, id));

    return Response.json({ message: "Recipe updated successfully!" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
