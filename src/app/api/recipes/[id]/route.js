import { recipes } from "../../../../db/schema"
import { db } from "../../../../db/db"
import { eq } from "drizzle-orm"

export async function GET(request,nextData) {
    const id = Number(nextData.params.id)
    try {
        let recipe = await db.select().from(recipes).where(eq(recipes.id,id))
        if(recipe.length == 0){
            return Response.json({
                message : "no recipe found under this id"
            },{status :404})
        }
        return Response.json({
            message : "Data fetched successully",
            recipe
        },{status:200})
    } catch (error) {
        return Response.json({
            message : error.message
        },{status:500})
    }  
}

export async function DELETE(request,nextData){
    const id = Number(nextData.params.id)
   try {
    await db.delete(recipes).where(eq(recipes.id,id))
    return Response.json({
        message : "Data deleted successully"
    },{status:200})
   } catch (error) {
    return Response.json({
        message : error.message
    },{status:500})
   }
}