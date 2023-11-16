import express from "express"
import multer from 'multer' // thu vien up img
import path from "path"

import ApiLoginController from "./../controllers/ApiLoginController"
import ApiUserController from "./../controllers/ApiUserController"
import ApiPostController from "./../controllers/ApiPostController"
import ApiNewsController from "./../controllers/ApiNewsController"
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

const api = express.Router()
const initAPIRoute = (app) => {

    api.get('/login-auth', ApiLoginController.login)
    api.post('/login', ApiLoginController.login_auth)
    api.get('/logout', ApiLoginController.logout)


    //api quan ly user ( user )  
    api.get('/create_new_user', ApiUserController.new_user)
    api.post('/insert_new_user', ApiUserController.insert_user)
    api.get('/list-user/:from-:to', ApiUserController.list_user)
    api.get('/detail_user/:username', ApiUserController.detail_user)
    api.delete('/del_user/:username', ApiUserController.del_user)
    api.get('/view_edit/:username', ApiUserController.view_edit)
    api.put('/edit_user', ApiUserController.edit_user)


    //api quan ly bai viet ( post )  
    api.get('/list-post/:from-:to', ApiPostController.list_post)
    api.get('/create_new_post', ApiPostController.new_post)
    api.post('/insert_new_post', upload.single('filenew'), ApiPostController.insert_post)
    api.get('/detail_post/:id', ApiPostController.detail_post)
    api.get('/view_edit_post/:id', ApiPostController.view_edit_post)
    api.put('/edit_post', upload.single('filenew'), ApiPostController.edit_post)
    api.delete('/del_post', ApiPostController.del_post)


    //api quan ly tin tuc (news)
    api.get('/GetById/:id', ApiNewsController.GetById)
    api.get('/list-news', ApiNewsController.list_news)
    api.post('/insert_news', ApiNewsController.insert_news)
    api.put('/edit_news/:id', ApiNewsController.edit_news)
    api.delete('/del_news/:id', ApiNewsController.del_news)

    return app.use('/api/v1', api)
}
export default initAPIRoute