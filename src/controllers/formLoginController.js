import express from "express"
import bcrypt from 'bcryptjs'
import userModel from "../services/userModel"

const login = (req, res) => {
    res.render('home', {data: {page: 'login', title: 'Đăng nhập'}})
}

const login_auth = async (req, res) => {
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
                
                if (bcrypt.compareSync(body.password, auth[0].password)) {
                    req.session.auth = {name:auth[0].username, pass:auth[0].password, role:auth[0].groupid}
                    res.redirect("/list-user/0-10")
                }
                else {
                    console.log("sai mat khau")
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}

export default {login, login_auth, logout}