import express from "express"
import bcrypt from 'bcryptjs'
import newsModel from "../services/newsModel"

const list_news = async (req, res) => {

    let _from = req.params.from
    let _to = req.params.to
    let auth = null

    if (req.session.auth) {
        auth = req.session.auth
    }
    
    if (isNaN(_from) === false && isNaN(_to) === false) {
        let list = await newsModel.list_news(_from, _to)
        res.render('home', {data: {page: 'listNews', title: 'Danh sách tin tức', params: {_from, _to} , list:list, auth:auth}})
    }
    else{
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
}

const new_news = (req, res) => {
    res.render('home', {data: {page: 'newNews', title: 'Tạo tin tức'}})
}

const insert_news = async (req, res) => {
    let body = req.body
    if (!body.title ) {
        res.status(404).send('<h1>Invalid parameter</h1>')
    }
    else{
        
       
        await newsModel.insert_news(body.title)
        res.redirect("/list-news/0-10")
    }
}

const detail_news = async (req, res) => {
    let title = req.params.title
    let list = await newsModel.detail_news(title)
    res.render('home', {data: {page: 'detailNews', title: 'Chi tiết tin tức', list:list}})
}

const view_edit_news = async (req, res) => {
    let id = req.params.id
    let list = await newsModel.detail_news_edit(id)
    res.render('home', {data: {page: 'viewEditNews', list:list}})
}

const edit_news = async (req, res) => {
    const id = req.body.id 
    let body = req.body
    console.table(body)
    await newsModel.edit_news(body.title,id)
    res.redirect('/list-news/0-10')
}

const del_news = async (req, res) => {
    const id = req.body.id 
 
    let list = await newsModel.del_news(id)
    res.redirect("/list-news/0-10")
}



export default {list_news,new_news,insert_news,detail_news,view_edit_news,edit_news,del_news}