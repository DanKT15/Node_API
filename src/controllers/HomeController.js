import express from "express"
// import homeModel from "../services/homeModel"

// const getHome = (req, res) => {
//     let name = req.params.namepage // nhân param
//     res.render('home', {data: {tilte:name}})
// }

// const setSession = async (req, res) => {
//     //req.session.destroy()
//     req.session.views = {'page':'home', 'test':10}
//     res.render('home', {data: {tilte:req.session.views.page}})
// }

// const getAbc = async (req, res) => {
//     let list = await homeModel.getall() // call model
//     return res.render('home', {data: {tilte:'name', rows:list}})
// }

// const getapi = (req, res) => {
//     return res.status(200).json({
//         data: 'list'
//     })
// }


const getHome = (req, res) => {
    // res.send('Home')
    res.redirect("/login")
}

export default {getHome}