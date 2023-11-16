import express from "express"
import jwt from "../middleware/JWTAction"

// let payload = { foo: 'bar' }
// let code = JWT.createJWT(payload)
// JWT.verifyToken(code)


const verifyAuth = (req, res, next) => {

    if (req.session.auth) {
        if (req.session.auth.role == 2) {

            // const token = req.body.token || req.query.token || req.headers["x-access-token"]

            const token = req.cookies.token;

            if (!token) {
                return res.status(200).json({ err: 1, mess: "bien token khong ton tai" })
            }

            try {
                const decoded = jwt.verifyToken(token)

                if (decoded) {
                    // res.status(200).json({ err: 1, mess: "token da xac thuc tai khoan" })
                    next()
                }
                else{
                    return res.status(200).json({ err: 1, mess: "khong xac thuc" })
                }

            } catch (error) {
                return res.status(200).json({ err: 1, mess: error })
            }
        } 
        else {
            return res.status(200).json({ err: 1, mess: "khong co quyen han truy cap" })
        }
    }
    else {
        return res.status(200).json({ err: 1, mess: "chua dang nhap tai khoan" })
    }
}

const Notfound = (req, res, next) => {
    res.status(404).send("<h1>Page not found on the server</h1>")
}

const HasLogin = (req, res, next) => {

    if (!req.session.auth) {
        next()
    }
    else {
        res.redirect('/list-user/0-10')
    }
}

const Authen = (req, res, next) => {

    if (req.session.auth) {
        if (req.session.auth.role == 2) {
            next()
        } 
        else {
            res.redirect('/list-user/0-10')
        }
    }
    else {
        res.redirect('/login')
    }
}

const auth = express.Router()
const authMiddleware = (app) => {

    auth.use("/insert_new_user", Authen)
    auth.use("/detail_user/:username", Authen)
    auth.use("/del_user", Authen)
    auth.use("/view_edit/:username", Authen)
    auth.use("/edit_user", Authen)
    auth.use("/list-user/:from-:to", Authen)
    auth.use("/create_new_user", Authen)

    //quan ly tin tuc ( news ) 
    auth.use('/list-news/:from-:to', Authen)
    auth.use('/create_new_news', Authen)
    auth.use('/insert_new_news', Authen)
    auth.use('/detail_news/:title', Authen)

    auth.use('/view_edit_news/:id', Authen)
    auth.use('/edit_news', Authen)
    auth.use('/del_news', Authen)


    //quan ly bai viet ( post )  
    auth.use('/list-post/:from-:to', Authen)
    auth.use('/create_new_post', Authen)
    auth.use('/insert_new_post', Authen)
    auth.use('/detail_post/:id', Authen)

    auth.use('/view_edit_post/:id', Authen)
    auth.use('/edit_post', Authen)
    auth.use('/del_post', Authen)
    // /login
    auth.use('/loginView', HasLogin)



    //===============================================API===================================================

    auth.use('/api/v1/login-auth', verifyAuth)

    //quan ly user ( user ) 
    auth.use("/api/v1/insert_new_user", verifyAuth)
    auth.use("/api/v1/detail_user/:username", verifyAuth)
    auth.use("/api/v1/del_user/:username", verifyAuth)
    auth.use("/api/v1/view_edit/:username", verifyAuth)
    auth.use("/api/v1/edit_user", verifyAuth)
    auth.use("/api/v1/list-user/:from-:to", verifyAuth)
    auth.use("/api/v1/create_new_user", verifyAuth)


    //quan ly tin tuc ( news ) 
    auth.use('/api/v1/list-news/:from-:to', verifyAuth)
    auth.use('/api/v1/create_new_news', verifyAuth)
    auth.use('/api/v1/insert_new_news', verifyAuth)
    auth.use('/api/v1/detail_news/:title', verifyAuth)
    auth.use('/api/v1/view_edit_news/:id', verifyAuth)
    auth.use('/api/v1/edit_news', verifyAuth)
    auth.use('/api/v1/del_news', verifyAuth)


    //quan ly bai viet ( post )  
    auth.use('/api/v1/list-post/:from-:to', verifyAuth)
    auth.use('/api/v1/create_new_post', verifyAuth)
    auth.use('/api/v1/insert_new_post', verifyAuth)
    auth.use('/api/v1/detail_post/:id', verifyAuth)
    auth.use('/api/v1/view_edit_post/:id', verifyAuth)
    auth.use('/api/v1/edit_post', verifyAuth)
    auth.use('/api/v1/del_post', verifyAuth)


    //api quan ly tin tuc (news)
    auth.use('/api/v1/GetById/:id', verifyAuth)
    auth.use('/api/v1/list-news', verifyAuth)
    auth.use('/api/v1/insert_news', verifyAuth)
    auth.use('/api/v1/edit_news/:id', verifyAuth)
    auth.use('/api/v1/del_news/:id', verifyAuth)


    return app.use("/", auth)
}

export default {authMiddleware, Notfound, verifyAuth}
