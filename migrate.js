import { connection, db } from "./src/db/db.js"
import {migrate} from "drizzle-orm/postgres-js/migrator"
 
(
    async()=>{
        await migrate(db,{migrationsFolder : "./drizzle"})
        await connection.end()
     }
)()