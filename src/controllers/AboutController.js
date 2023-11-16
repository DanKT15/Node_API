import express from "express"

const getAbout = (req, res) => {
    res.render('About', {data: {tilte:'About Page'}})
}


export default {getAbout}