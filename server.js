import express, { urlencoded } from'express'
import dotenv from 'dotenv'
import db from './src/config/db.js'
import cors from'cors'

//import route
import customerRouter from './src/routes/customerRouters.js'
//cau hinh co ban
dotenv.config()
const PORT = process.env.PORT || 3000
const server = express()
server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(cors({
    origin: process.env.URL_FONTEND,
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATH', 'OPTION'],

}))


//dinh nghia router
server.use('/customers',customerRouter)


//xu li loi chung
server.use((err, req, res, next) => {
  console.error(!err.status && err); 
  const status = err.status || 500;
  const message = err.status ? err.message : "Có lỗi xảy ra. Vui lòng thử lại.";
  res.status(status).json({ success: false, message });
});



server.listen(PORT, () => {
    console.log(`✅ server đang chạy tại port ${PORT}`);
    
})