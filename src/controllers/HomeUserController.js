import express from "express"
import fs from 'fs'
import con from "../config/connectDB"
import postModel from "../services/postModel"
import newsModel from "../services/newsModel"
import bcrypt from 'bcryptjs'
import userModel from "../services/userModel"

const HomeUser = async (req, res) => {

    let auth = null

    if (req.session.auth) {
        auth = req.session.auth
    }

    //lay 3 tin tuc noi bat
    var limitt = 3
    let list = await postModel.list_hot_post_user(limitt)
   

    //lay tin tuc moi nhat
  
    let lists = await postModel.list_new_post_user()


    res.render('User/HomeUser', {data: {page: 'IndexUser', title: 'Trang Chu',list:list,lists:lists,auth:auth}})
}

//chi tiet bai viet singlepost

const SinglePage = async (req, res) => {

    let id = req.params.id
    let item = await postModel.detail_post(id)

    //lay ra danh sach tin tuc

   let items = await newsModel.list_news_all(); 


    res.render('User/HomeUser', {data: {page: 'SinglePage',item:item,items:items}})
}

  //hien thi bai viet theo tin tuc
const ByNews = async (req, res) => {

    let news_id = req.params.id
    let items = await postModel.list_by_news(news_id)

    //lay ra danh sach tin tuc


    let itemss = await newsModel.list_news_all(); 
  


    res.render('User/HomeUser', {data: {page: 'ByNews',items:items,itemss:itemss}})
}







const LoginUser = (req, res) => {
    res.render('User/LoginUser', {data: {title: 'Login'}})
}



const login_auth_User = async (req, res) => {
    let body = req.body
    if (!body.username || !body.password) {
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
    else {
        try {
            let auth = await userModel.auth(body.username)

            if (!auth[0].username || !auth[0].password || !auth[0].groupid) {
                console.log("khong ton tai tk")
            }
            else {

              
                let hash = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
                
               if(auth[0].groupid == 1){
                            if (bcrypt.compareSync(body.password, auth[0].password)) {
                                req.session.auth = {name:auth[0].username, pass:auth[0].password, role:auth[0].groupid}
                                res.redirect("/")
                            }
                            else {
                                console.log("sai mat khau")
                            }
                }
               else{
                console.log("sai mat khau")
               }
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const logout_User = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}


const RegisterUser = (req, res) => {
    res.render('User/RegisterUser', {data: {title: 'Register'}})
}



const request_register = async (req, res) => {
    let body = req.body
    if (!body.username || !body.password || !body.fullname || !body.address) {
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
    else{
        
        let role = 1
        let pass = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(body.password, pass)


        await userModel.insert_user_Users(body.username, hash, body.fullname, body.address, role)
        res.redirect("/")
    }
}







export default {HomeUser,LoginUser,SinglePage,RegisterUser,login_auth_User,logout_User,request_register,ByNews}