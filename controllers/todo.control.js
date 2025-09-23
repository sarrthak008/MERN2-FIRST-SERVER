
import TODOS from "../data.js"

const getTodo = (req, res) => {

    try {

        return res.status(200).json({ data: TODOS, message: "todos fetched successfully", success: true })

    } catch (error) {

        return res.status(500).json({ data: null, message: error.message, success: false })

    }

}


const addTodo = (req, res) => {

    let { userId, title } = req.body

    try {

        if (!userId) {
            return res.status(401).json({ data: null, message: "userId is required", success: false })
        }

        if (!title) {
            return res.status(401).json({ data: null, message: "title is required", success: false })
        }

        TODOS.push({
            "userId": userId,
            "id": TODOS.length + 1,
            "title": title,
            "completed": false
        })

        return res.status(201).json({ data: null, message: "todo added successfully", success: true })

    } catch (error) {
        return res.status(500).json({ data: null, message: error.message, success: false })

    }
}


const gettodoById  = (req, res) => {
    try {

        let { id } = req.params

        let findedTodo = TODOS.find((todo) => todo.id == id)

        if (!findedTodo) {
            return res.status(404).json({ data: null, message: "todo not found", success: false })
        }

        return res.status(302).json({ data: findedTodo, message: "todo found", success: true })

    } catch (error) {

        return res.status(500).json({ data: null, message: error.message, success: false })

    }
}



const deleteTodoById = (req, res) => {
    let { id } = req.params
    try {
        let index = TODOS.findIndex((todo) => todo.id == id)
        if (index == -1) {
            return res.status(404).json({ data: null, message: "todo not found", success: false })
        }

        let deletedTodo = TODOS.splice(index, 1)
        return res.status(200).json({ data: deletedTodo, message: "todo deleted successfully", success: true })

    } catch (error) {
        return res.status(500).json({ data: null, message: error.message, success: false })
    }
}



const updateStatusById = (req, res) => {
    let { id } = req.params
    try {
        let index = TODOS.findIndex((todo) => todo.id == id)
        if (index == -1) {
            return res.status(404).json({ data: null, message: "todo not found", success: false })
        }

        TODOS[index].completed = !TODOS[index].completed

        return res.status(200).json({ data: TODOS[index], message: "todo updated successfully", success: true })

    } catch (error) {
        return res.status(500).json({ data: null, message: error.message, success: false })
    }
}


export {getTodo,addTodo,gettodoById,deleteTodoById,updateStatusById}