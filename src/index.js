import express from "express"
import dotenv from "dotenv"
import RedisStore from "connect-redis"
import session from "express-session"
import {createClient} from "redis"
import configViewEngine from "./config/viewEngine"
import initWebRoute from "./router/webRoute"
import initAPIRoute from "./router/apiRoute"
import path from "path"
import bodyParser from "body-parser"
import Auth from "./middleware/Auth"
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()

dotenv.config() // cấu hình port trong .env
const port = process.env.PORT

// Initialize client.
let redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

// Initialize sesssion storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat",
    
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

configViewEngine(app) // khởi tạo viewEngine

app.use('/static', express.static(path.join(__dirname,'public'))) // thêm "/static" vào link ảnh vd:"/static/img/h1.jpg"

app.use(cookieParser())

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1'
    // đường dẫn web react 
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

app.use(cors(corsOptions));

Auth.authMiddleware(app)

initWebRoute(app) // khởi tạo router
initAPIRoute(app) // khởi tạo router api

app.use(Auth.Notfound)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})