import express from "express"
import bcrypt from 'bcryptjs'
import userModel from "../services/userModel"

const new_user = (req, res) => {
    res.render('home', {data: {page: 'newUser', title: 'Tạo tài khoản'}})
}

const insert_user = async (req, res) => {
    let body = req.body
    if (!body.name || !body.pass || !body.nameuser || !body.address || !body.flexRadioDefault || !body.email) {
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
    else{
        let role = 1
        let pass = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(body.pass, pass)
        await userModel.insert_user(body.name, hash, body.nameuser, body.address, body.flexRadioDefault, body.email, role)
        res.redirect("/list-user/0-10")
    }
}

const list_user = async (req, res) => {

    let _from = req.params.from
    let _to = req.params.to
    let auth = null

    if (req.session.auth) {
        auth = req.session.auth
    }
    
    if (isNaN(_from) === false && isNaN(_to) === false) {
        let list = await userModel.list_user(_from, _to)
        res.render('home', {data: {page: 'listUser', title: 'Danh sách tài khoản', params: {_from, _to} , list:list, auth:auth}})
    }
    else{
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
}

const detail_user = async (req, res) => {
    let Username = req.params.username
    let list = await userModel.detail_user(Username)
    res.render('home', {data: {page: 'detailUser', title: 'Chi tiết người dùng', list:list}})
}

const edit_user = async (req, res) => {
    let role = 1
    let body = req.body
    console.table(body)
    if (!body.name || !body.pass || !body.nameuser || !body.address || !body.flexRadioDefault || !body.email) {
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
    let pass = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(body.pass, pass)
    await userModel.edit_user(body.name, hash, body.nameuser, body.address, body.flexRadioDefault, body.email, role)
    res.redirect("/detail_user/" + body.name)
}

const view_edit = async (req, res) => {
    let Username = req.params.username
    let list = await userModel.detail_user(Username)
    res.render('home', {data: {page: 'viewEdit', title: 'Cập nhật', list:list}})
}

const del_user = async (req, res) => {
    let body = req.body
    if (!body.username) {
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
    let list = await userModel.del_user(body.username)
    res.redirect("/list-user/0-10")
}

export default {new_user, list_user, detail_user, insert_user, edit_user, del_user, view_edit}