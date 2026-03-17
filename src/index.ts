import express from 'express'
import todoRouter from "./routers/todoRouter.js";
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use('/api/items', todoRouter)
