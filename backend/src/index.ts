import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 8080;
connectToDatabase()
 .then(()=>{
  app.listen(PORT,() => {
    console.log("Server started & Database connected successfully")
  });
 })
 .catch((err)=>{
   console.error(err);
});
//-----------Connections and Listeners-------
