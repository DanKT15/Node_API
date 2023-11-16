import con from "./../config/connectDB"

const getall = async () => {
    const [rows, fields] = await con.execute('SELECT * FROM `danhmuc`')
    return rows
} 

export default {getall}