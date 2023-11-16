import express from "express"
import bcrypt from 'bcryptjs'
import userModel from "../services/userModel"
import { json } from "body-parser"
import JWT from "../middleware/JWTAction"


const new_user = (req, res) => {

    try {
        
        return res.status(200).json(
            {
                page: 'newUser', 
                title: 'Tạo tài khoản'
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

const insert_user = async (req, res) => {

    try {

        let body = req.body

        if (!body.username || !body.password || !body.fullname || !body.address || !body.sex || !body.email || !body.groupid) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Thiếu thông tin cần thiết"
                }
            )
        }

        let user = await userModel.detail_user(body.username)

        if (user.length >= 1) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Tài khoản đã tồn tại"
                }
            )
        }

        let pass = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(body.password, pass)

        let newuser = await userModel.insert_user(body.username, hash, body.fullname, body.address, body.sex, body.email, body.groupid)

        return res.status(200).json(
            {
                err: 0,
                mess: "Tạo tài khoản thành công"
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

const list_user = async (req, res) => {

    try {

        let _from = req.params.from
        let _to = req.params.to

        if (isNaN(_from) === false && isNaN(_to) === false) {
        
            let list = await userModel.list_user(_from, _to)

            return res.status(200).json(
                {
                    err: 0,
                    title: 'Danh sách tài khoản', 
                    params: {
                        from:_from, 
                        to:_to
                    }, 
                    list: list
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

const detail_user = async (req, res) => {

    try {

        let Username = req.params.username
        let list = await userModel.detail_user(Username)

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
                page: 'detailUser', 
                title: 'Chi tiết người dùng', 
                list:list
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

const edit_user = async (req, res) => {

    try {

        let body = req.body

        if (!body.username || !body.password || !body.fullname || !body.address || !body.sex || !body.email || !body.groupid) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Thiếu thông tin cần thiết"
                }
            )
        }

        let pass = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(body.password, pass)

        let updatauser = await userModel.edit_user(body.username, hash, body.fullname, body.address, body.sex, body.email, body.groupid)

        return res.status(200).json(
            {
                err: 0,
                mess: "Cập nhật thành công",
                hash: hash
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

const view_edit = async (req, res) => {

    try {

        let Username = req.params.username
        let list = await userModel.detail_user(Username)

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
                page: 'viewEdit', 
                title: 'Cập nhật', 
                list:list
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

const del_user = async (req, res) => {

    try {

        let body = req.params

        if (!body.username) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Lỗi: thiếu tài khoản"
                }
            )
        }

        const token = req.cookies.token;
        
        if (token) {

            let decode = JWT.verifyToken(token);

            if (decode.data.auth === body.username) {
                return res.status(200).json(
                    {
                        err: 1,
                        mess: "Tài khoản đang được sử dụng"
                    }
                ) 
            }
            else {

                let user = await userModel.detail_user(body.username)

                if (user.length < 1) {
                    return res.status(200).json(
                        {
                            err: 1,
                            mess: "Người dùng không tồn tại"
                        }
                    )
                }

                let list = await userModel.del_user(body.username)
    
                return res.status(200).json(
                    {
                        err: 0,
                        mess: "Xóa tài khoản thành công"
                    }
                )
            }

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

export default {new_user, list_user, detail_user, insert_user, edit_user, del_user, view_edit}