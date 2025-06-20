require('dotenv').config()

const express = require('express')
const moduls = require('./models/models')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.jsob())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

// Обработка помилок послдений Мідлеваре
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}


start()