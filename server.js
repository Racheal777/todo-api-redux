const express = require('express')
const { v4: uuidv4} = require('uuid')
const cors = require('cors')

const PORT = 7000

const app = express()


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//dummy data
let tasks = [
    {
        id: "724b181a-dc71-41c0-9f02-bc6cd1920748",
        text: "visit a friend",
        isCompleted: false
    },

    {
        id: "6bf78456-48be-49fd-bbc1-a327cc0e36bd",
        text: "go for jogging",
        isCompleted: false
    },

    {
        id: "1eff8beb-4605-470c-ad36-2e37ff0c6367",
        text: "edit the article",
        isCompleted: false
    },

    {
        id: "da042f24-7783-4789-9cc4-26406e047e04",
        text: "call my dad",
        isCompleted: false
    },

]

//post request
app.post('/savepost', (req, res) => {

    try {
        const {text } = req.body

        if(text){
            const newTodo = {
                id: uuidv4(),
                text: text,
                isCompleted: false
            }
    
            tasks.push(newTodo)
            res.status(200).json(newTodo)
        }else{
            res.status(400).json({msg: "request must have a text"})
        }
          
    } catch (error) {
        console.log(error)
    }
      
})

//get request
app.get('/gettask', (req, res) => {
    try {
        res.status(200).json(tasks)  
    } catch (error) {
       console.log(error) 
    }
    
})

//update
app.put('/update/:id', (req, res) => {
    const { id } = req.params
    //finding match
    const findmatch = tasks.find(task => task.id === id)

    console.log(findmatch)
//updating the task
    tasks = tasks.map(task => {
        console.log(task)
        return task.id === id ? {...task, isCompleted: !task.isCompleted} : {...task}
    })

    res.status(200).json(findmatch)
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    tasks = tasks.filter(task => task.id !== id)
    res.status(200).json(tasks)

})

//console.log(uuidv4())
app.listen(PORT, ()=> console.log(`Server is running at ${PORT}`) )