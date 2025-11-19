const express  = require('express')
const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT || 3000
const server = express()





server.listen(PORT, () => {
    console.log(`✅ server đang chạy tại port ${PORT}`);
    
})