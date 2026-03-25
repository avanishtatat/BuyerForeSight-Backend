const express = require("express"); 
const {openDB} = require("./config/db")
const userRouter = require("./routes/userRoutes")
const app = express(); 


app.use(express.json()); 
app.use("/api/v1", userRouter);

const initializeDBandServer = async () => {
  try{
    const db = await openDB(); 
    app.listen(3000, () => {
      console.log('Server Running At http://localhost:3000');
    })
  }catch(error) {
    console.error("DB error:", error); 
    process.exit(1); 
  }
}
initializeDBandServer(); 



