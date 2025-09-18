import express from "express";

const app = express()
const PORT = 3000

//import todos file
import TODOS from "./data.js";

//middlawers 

app.use(express.json()) // converts data into json 
app.use(express.urlencoded({ extended: true })) // converts ur url data..


app.get("/", (req, res) => {
    res.json({ data: null, message: "welcome in our todo api" });
})

/// create a route to get todo...

app.get("/gettodo", (req, res) => {

    try {

        return res.json({ data: TODOS, message: "here is your todos", success: true })

    } catch (error) {

        return res.json({ data: null, message: error.message, success: false })

    }

})


/// create a route for add todo.

app.post("/addtodo", (req, res) => {

    let { userId, title } = req.body

    try {

        if (!userId) {
            return res.json({ data: null, message: "userId is required", success: false })
        }

        if (!title) {
            return res.json({ data: null, message: "title is required", success: false })
        }

        TODOS.push({
            "userId": userId,
            "id": TODOS.length + 1,
            "title": title,
            "completed": false
        })

        return res.json({ data: null, message: "todo added successfully", success: true })

    } catch (error) {
        return res.json({ data: null, message: error.message, success: false })

    }
})


// use params 

app.get("/gettodo/:id", (req, res) => {
    try {

        let { id } = req.params

        let findedTodo = TODOS.find((todo) => todo.id == id)

        if (!findedTodo) {
            return res.json({ data: null, message: "todo not found", success: false })
        }

        return res.json({ data: findedTodo, message: "todo found", success: true })

    } catch (error) {

        return res.json({ data: null, message: error.message, success: false })

    }
})


app.delete("/deletetodo/:id", (req, res) => {
    let { id } = req.params
    try {
        let index = TODOS.findIndex((todo) => todo.id == id)
        if (index == -1) {
            return res.json({ data: null, message: "todo not found", success: false })
        }

        let deletedTodo = TODOS.splice(index, 1)
        return res.json({ data: deletedTodo, message: "todo deleted successfully", success: true })

    } catch (error) {
        return res.json({ data: null, message: error.message, success: false })
    }
})


app.pathch("/updatestatus/:id",(req,res)=>{
    let {id} = req.params
     try {
        let index = TODOS.findIndex((todo)=>todo.id == id)
        if(index == -1){
            return res.json({data:null,message:"todo not found",success:false})
        }

        TODOS[index].completed = !TODOS[index].completed
        
        return res.json({data:TODOS[index],message:"todo updated successfully",success:true})

     } catch (error) {
         return res.json({data:null,message:error.message,success:false})
     }
})



app.get("/health", (req, res) => {
    return res.json({ data: null, message: "server is runnig healthy..." })
})

app.listen(PORT, () => {
    console.log(`server is linstining on the port ${PORT}`)
})