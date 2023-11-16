import express from "express"
import bcrypt from 'bcryptjs'
import userModel from "../services/userModel"
import { json } from "body-parser"
import JWT from "../middleware/JWTAction"


const login = (req, res) => {

    try {

        const token = req.cookies.token;
        
        if (token) {

            let decode = JWT.verifyToken(token);

            return res.status(200).json(
                {
                    err: 0,
                    mess: "Xác thực token thành công",
                    jwt: {user: decode}
                }
            ) 
        }
        else {
            res.status(200).json(
                {
                    err: 1,
                    mess: "Lỗi: không tồn tại token",
                    jwt: ""
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

const login_auth = async (req, res) => {

    try {

        let body = req.body

        if (!body.username || !body.password) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Lỗi: thiếu tài khoản hoặc mật khẩu"
                }
            )
        }

        let author = await userModel.auth(body.username)

        if (author.length < 1) {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Lỗi: tài khoản không tồn tại"
                }
            )
        }

        let hash = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))

        if (bcrypt.compareSync(body.password, author[0].password)) {

            req.session.auth = { name: author[0].username, pass: author[0].password, role: author[0].groupid }

            const token = JWT.createJWT({ data: { auth: author[0].username, role: author[0].groupid } }) // mã hóa id và quyen

            res.cookie('token', token, { httpOnly: true })

            return res.status(200).json(
                {
                    err: 0,
                    mess: "Đăng nhập thành công",
                    user: {name: author[0].username, role: author[0].groupid}
                }
            )
        }
        else {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Lỗi: sai mật khẩu"
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

const logout = (req, res) => {

    try {

        if (req.session.auth) {

            res.clearCookie('token');

            req.session.destroy();

            return res.status(200).json(
                {
                    err: 0,
                    mess: "Đăng xuất thành công"
                }
            )

        }
        else {
            return res.status(200).json(
                {
                    err: 1,
                    mess: "Chưa đăng nhập"
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

export default { login, login_auth, logout }


