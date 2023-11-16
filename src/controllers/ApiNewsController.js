import express from "express"
import fs from 'fs' // thư viện thao tác file
import postModel from "../services/postModel"
import newsModel from "../services/newsModel"
import { json } from "body-parser"
import JWT from "../middleware/JWTAction"

//api reactjs 

const apiReactList = async (req, res) => {
    
    const users = await newsModel.list_news_all();

    res.status(200).json({
      data: users
    })

}

const apiNewId = async (req, res) => {
    const  newId = req.params.id;
    
    const GetById = await newsModel.GetById(newId);

    res.status(200).json({
        data: GetById
      })

}

//hien thi bai viet theo loai tin tuc
const apiPostFromNew = async (req, res) => {
    const  newId = req.params.id;
    const GetList = await postModel.list_by_news(newId);

    res.status(200).json({
      data: GetList
    })

}





const list_news = async (req, res) => {

    try {
            let items = await newsModel.list_news_all()
    
            return res.status(200).json(
                {
                    items: items,
                    mess: "Danh sách tin tức"
                }
            )
        
    } catch (error) {
        return res.status(400).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
}

const GetById = async (req, res) => {

    try {

            let id = req.params.id
            let items = await newsModel.GetById(id)
    
            return res.status(200).json(
                {
                    items: items,
                    mess: "chi tiết tin tức"
                }
            )
        
    } catch (error) {
        return res.status(400).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
}

const insert_news = async (req, res) => {

    try {

        let body = req.body

        let items =  await newsModel.insert_news(body.title)
       
        return res.status(400).json(
            {
                items: items,
                mess: "Insert thành công "
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
}

const edit_news = async (req, res) => {

    try {

        let id = req.params.id
        let body = req.body

      
            let news = await newsModel.GetById(id)

            if (news.length < 1) {
                return res.status(400).json(
                    {
                        err: 1,
                        mess: "Bài viết không tồn tại"
                    }
                )
            }

      

        if (!body.title) {
            return res.status(400).json(
                {
                    err: 1,
                    mess: "Thiếu thông tin cần thiết"
                }
            )
        }

        await newsModel.edit_news(body.title,id)

        return res.status(200).json(
            {
                err: 0,
                mess: "Cập nhật thành công"
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
}

const del_news = async (req, res) => {

    try {

            let id = req.params.id
            let items = await newsModel.del_news(id)
    
            return res.status(200).json(
                {
                    err: 0,
                    mess: "Bạn đã xóa thành công"
                }
            )
        
    } catch (error) {
        return res.status(400).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
}


export default {apiPostFromNew,apiNewId,apiReactList,list_news,GetById,insert_news,edit_news,del_news}
