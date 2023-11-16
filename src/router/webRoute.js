import express from "express"
import multer from 'multer' // thu vien up img
import path from "path"
import HomeController from "./../controllers/HomeController" // add controller
import AboutController from "./../controllers/AboutController" // add controller
import UserController from "./../controllers/UserController" // add controller
import formLoginController from "./../controllers/formLoginController"

import HomeUserController from "./../controllers/HomeUserController" // add controller


import NewsController from "./../controllers/NewsController" // add controller
import PostController from "./../controllers/PostController" // add controller

import ApiNewsController from "./../controllers/ApiNewsController" // add controller
import ApiPostController from "./../controllers/ApiPostController" // add controller

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })

const router = express.Router()
const initWebRoute = (app) => {

    // app.get('/home/:namepage', HomeController.getHome) // truyền param
    // app.get('/set-session', HomeController.setSession)
    // app.get('/abc', HomeController.getAbc)

    router.get('/admin', HomeController.getHome)
    router.get('/about', AboutController.getAbout)

    router.get('/create_new_user', UserController.new_user)
    router.post('/insert_new_user', UserController.insert_user)

    router.get('/list-user/:from-:to', UserController.list_user)

    router.get('/login', formLoginController.login)
    router.post('/login', formLoginController.login_auth)
    router.get('/logout', formLoginController.logout)

    router.get('/detail_user/:username', UserController.detail_user)

    router.post('/del_user', UserController.del_user)

    router.get('/view_edit/:username', UserController.view_edit)
    router.post('/edit_user', UserController.edit_user)

    
    //user
    router.get('/', HomeUserController.HomeUser)
    
    router.get('/LoginUser', HomeUserController.LoginUser)
    router.post('/login_auth_User', HomeUserController.login_auth_User)
    router.get('/logout_User', HomeUserController.logout_User)

    
    router.get('/RegisterUser', HomeUserController.RegisterUser)
    router.post('/request_register', HomeUserController.request_register)

    
    router.get('/SinglePage/:id', HomeUserController.SinglePage)


    //hien thi bai viet theo tin tuc
    router.get('/ByNews/:id', HomeUserController.ByNews)
    

    //quan ly tin tuc ( news )  
    router.get('/list-news/:from-:to', NewsController.list_news)
    router.get('/create_new_news', NewsController.new_news)
    router.post('/insert_new_news', NewsController.insert_news)
    router.get('/detail_news/:title', NewsController.detail_news)

    router.get('/view_edit_news/:id', NewsController.view_edit_news)
    router.post('/edit_news', NewsController.edit_news)
    router.post('/del_news', NewsController.del_news)


    //quan ly bai viet ( post )  
    router.get('/list-post/:from-:to', PostController.list_post)
    router.get('/create_new_post', PostController.new_post)
    router.post('/insert_new_post', upload.single('filenew'), PostController.insert_post)
    router.get('/detail_post/:id', PostController.detail_post)


  router.get('/SinglePage/:id', HomeUserController.SinglePage)


  //hien thi bai viet theo tin tuc
  router.get('/ByNews/:id', HomeUserController.ByNews)


  //quan ly tin tuc ( news )  
  router.get('/list-news/:from-:to', NewsController.list_news)
  router.get('/create_new_news', NewsController.new_news)
  router.post('/insert_new_news', NewsController.insert_news)
  router.get('/detail_news/:title', NewsController.detail_news)

  router.get('/view_edit_news/:id', NewsController.view_edit_news)
  router.post('/edit_news', NewsController.edit_news)
  router.post('/del_news', NewsController.del_news)


  //quan ly bai viet ( post )  
  router.get('/list-post/:from-:to', PostController.list_post)
  router.get('/create_new_post', PostController.new_post)
  router.post('/insert_new_post', upload.single('filenew'), PostController.insert_post)
  router.get('/detail_post/:id', PostController.detail_post)

  router.get('/view_edit_post/:id', PostController.view_edit_post)
  router.post('/edit_post', upload.single('filenew'), PostController.edit_post)
  router.post('/del_post', PostController.del_post)


  // //api react

  // router.get('/api/news', ApiNewsController.apiReactList)
  // router.get('/api/news/:id', ApiNewsController.apiPostFromNew)

  // router.get('/api/posts', ApiPostController.apiPostList)
  // router.get('/api/post/:id', ApiPostController.apiPostId)


  return app.use("/", router)
}
export default initWebRoute