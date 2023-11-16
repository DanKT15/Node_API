import con from "./../config/connectDB"

const list_news_all = async () => {
    const [rows, fields] = await con.execute('SELECT * FROM `news`')
    return rows
} 

const GetById = async (id) => {
    const [rows, fields] = await con.execute('SELECT * FROM news WHERE news.id LIKE ?', [id])
    return rows
}

const list_news = async (from, to) => {
    const [rows, fields] = await con.execute('SELECT * FROM `news` LIMIT ?, ?', [from, to])
    return rows
} 

const insert_news = async (title) => {
    await con.execute('INSERT INTO `news`(`title`) VALUES (?)',[title])
} 
const detail_news = async (title) => {
    const [rows, fields] = await con.execute('SELECT * FROM news WHERE news.title LIKE ?', [title])
    return rows
}

const detail_news_edit = async (id) => {
    const [rows, fields] = await con.execute('SELECT * FROM news WHERE news.id LIKE ?', [id])
    return rows
}
const edit_news = async (title,id) => {
    await con.execute('UPDATE `news` SET `title`=? where news.id = ?  ',[title,id])
}

const del_news = async (id) => {
    await con.execute('DELETE FROM `news` WHERE news.id = ?',[id])
}
export default {list_news,insert_news,detail_news,edit_news,detail_news_edit,del_news, list_news_all,GetById}