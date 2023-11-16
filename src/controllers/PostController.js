import express from "express"
import fs from 'fs' // thư viện thao tác file

import postModel from "../services/postModel"
import newsModel from "../services/newsModel"


const list_post = async (req, res) => {

    let _from = req.params.from
    let _to = req.params.to
    let auth = null

    if (req.session.auth) {
        auth = req.session.auth
    }
    
    if (isNaN(_from) === false && isNaN(_to) === false) {
        let list = await postModel.list_post(_from, _to)
        res.render('home', {data: {page: 'listpost', title: 'Danh sách bài viết', params: {_from, _to} , list:list, auth:auth}})
    }
    else{
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
}

const new_post = async (req, res) => {
    let danhmuc = await newsModel.list_news_all()
    res.render('home', {data: {page: 'newpost', title: 'Tạo bài viết', danhmuc:danhmuc}})
}

const insert_post = async (req, res) => {
    let img = req.file
    let body = req.body
    if (!body.titlenew || !body.contentnew || !img.filename || !body.news_id) {
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
    else{
        const currentDate = new Date();
        await postModel.insert_post(body.titlenew, body.contentnew, img.filename, body.news_id,currentDate)
        res.redirect("list-post/0-10")
    }
}

const detail_post = async (req, res) => {
    let id = req.params.id
    let danhmuc = await newsModel.list_news_all()
    let list = await postModel.detail_post(id)
    res.render('home', {data: {page: 'detailpost', title: 'Chi tiết bài viết', list:list, danhmuc:danhmuc}})
}

const view_edit_post = async (req, res) => {
    let id = req.params.id
    let danhmuc = await newsModel.list_news_all()
    let list = await postModel.detail_post_edit(id)
    res.render('home', {data: {page: 'viewEditpost', title: 'Cập nhật bài viết', list:list, danhmuc:danhmuc}})
}

const edit_post = async (req, res) => {
    const id = req.body.id 
    let body = req.body
    let img = body.img_old
    let file = req.file

    if (file) {
        img = file.filename
        let post = await postModel.detail_post(id)
        fs.unlinkSync('./src/public/upload/' + post[0].image)
    }
    
    if (!body.titlenew || !body.contentnew || !body.news_id) {
        res.status(404).send('<h1>Invalid parameter</h1>')
    } 
    else {
        await postModel.edit_post(body.titlenew, body.contentnew, img, body.news_id, id)
        res.redirect('list-post/0-10')
    }
}

const del_post = async (req, res) => {
    const id = req.body.id 
    let post = await postModel.detail_post(id)
    fs.unlinkSync('./src/public/upload/' + post[0].image)
    let list = await postModel.del_post(id)
    res.redirect("list-post/0-10")
}

export default {list_post,new_post,insert_post,detail_post,view_edit_post,edit_post,del_post}