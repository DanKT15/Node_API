import express from "express"
import fs from 'fs' // thư viện thao tác file
import postModel from "../services/postModel"
import newsModel from "../services/newsModel"
import { json } from "body-parser"
import JWT from "../middleware/JWTAction"


const new_post = async (req, res) => {

    try {
        let danhmuc = await newsModel.list_news_all()
        return res.status(200).json(
            {
                page: 'newpost', 
                title: 'Tạo bài viết',
                danhmuc: danhmuc
            }
        )

    } catch (error) {
        return res.status(200).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
    
}

const insert_post = async (req, res) => {

    try {

        let body = req.body
        let img = req.file


        if (!body.titlenew || !body.contentnew || !img.filename || !body.news_id) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Thiếu thông tin cần thiết"
                }
            )
        }

        const currentDate = new Date();

        await postModel.insert_post(body.titlenew, body.contentnew, img.filename, body.news_id, currentDate)

    } catch (error) {
        return res.status(200).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
}

const list_post = async (req, res) => {

    try {

        let _from = req.params.from
        let _to = req.params.to
        let auth = null

        if (req.session.auth) {
            auth = req.session.auth.name
        } 

        if (isNaN(_from) === false && isNaN(_to) === false) {
        
            let list = await postModel.list_post(_from, _to)
    
            return res.status(200).json(
                {
                    page: 'listpost', 
                    title: 'Danh sách bài viết', 
                    params: {
                        from: _from, 
                        to: _to
                    }, 
                    list: list, 
                    auth: auth
                }
            )
        }
    } catch (error) {
        return res.status(200).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
}

const detail_post = async (req, res) => {

    try {

        let id = req.params.id
        let danhmuc = await newsModel.list_news_all()
        let list = await postModel.detail_post(id)

        if (list.length < 1) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Bài viết không tồn tại"
                }
            )
        }

        return res.status(200).json(
            {
                page: 'detailpost', 
                title: 'Chi tiết bài viết', 
                list: list,
                danhmuc: danhmuc
            }
        )

    } catch (error) {
        return res.status(200).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
    
}

const edit_post = async (req, res) => {

    try {

        const id = req.body.id 
        let body = req.body
        let img = body.img_old // truyền img cũ qua hidden input
        let file = req.file

        if (file) {

            img = file.filename
            let post = await postModel.detail_post(id)

            if (post.length < 1) {
                return res.status(200).json(
                    {
                        err: 1,
                        mess: "Bài viết không tồn tại"
                    }
                )
            }

            fs.unlinkSync('./src/public/upload/' + post[0].image)
        }

        if (!body.titlenew || !body.contentnew || !body.news_id) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Thiếu thông tin cần thiết"
                }
            )
        }

        await postModel.edit_post(body.titlenew, body.contentnew, img, body.news_id, id)

        return res.status(200).json(
            {
                err: 0,
                mess: "Cập nhật thành công"
            }
        )

    } catch (error) {
        return res.status(200).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }
}

const view_edit_post = async (req, res) => {

    try {

        let id = req.params.id
        let danhmuc = await newsModel.list_news_all()
        let list = await postModel.detail_post_edit(id)

        if (list.length < 1) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Người dùng không tồn tại"
                }
            )
        }

        return res.status(200).json(
            {
                page: 'viewEditpost', 
                title: 'Cập nhật bài viết', 
                list: list,
                danhmuc: danhmuc
            }
        )

    } catch (error) {
        return res.status(200).json(
            {
                err: 1,
                mess: "Lỗi: " + error
            }
        )
    }

}

const del_post = async (req, res) => {

    try {

        const id = req.body.id 
        let post = await postModel.detail_post(id)

        if (post.length < 1) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Bài viết không tồn tại"
                }
            )
        }

        fs.unlinkSync('./src/public/upload/' + post[0].image)
        let list = await postModel.del_post(id)

        return res.status(200).json(
            JWT.createJWT({data: {
                err: 0,
                mess: "Xóa bài viết thành công"}}
            )
        )

    } catch (error) {
        return res.status(200).json(
            JWT.createJWT({data: {
                err: 1,
                mess: "Lỗi: " + error}}
            )
        )
    }
}

export default {list_post,new_post,insert_post,detail_post,view_edit_post,edit_post,del_post}
