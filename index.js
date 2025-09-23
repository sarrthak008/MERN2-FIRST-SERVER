import express from "express";

const app = express()
const PORT = 3000


//middlawers 
app.use(express.json()) // converts data into json 
app.use(express.urlencoded({ extended: true })) // converts ur url data..


//controllers 
import { getTodo ,addTodo ,gettodoById ,deleteTodoById ,updateStatusById } from "./controllers/todo.control.js";


app.get("/", (req, res) => {
    res.status(200).json({ data: null, message: "welcome in our todo api" });
})

/// create a route to get todo...
app.get("/gettodo",getTodo)
/// create a route for add todo.
app.post("/addtodo", addTodo)

// use params 
app.get("/gettodo/:id", gettodoById)
app.delete("/deletetodo/:id",deleteTodoById )
app.patch("/updatestatus/:id", updateStatusById)






app.get("/health", (req, res) => {
    return res.status(200).json({ data: null, message: "server is runnig healthy..." })
})

app.listen(PORT, () => {
    console.log(`server is linstining on the port ${PORT}`)
})