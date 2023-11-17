import con from "./../config/connectDB"

//trang nguoi dung  -- hien thi bai viet theo tin tuc
const list_by_news = async (news_id) => {
    const [rows, fields] = await con.execute('SELECT * FROM `posts` WHERE posts.news_id = ? ORDER BY posts.id DESC',[news_id])
    return rows
}


//show user noi bat
const list_hot_post_user = async (limitt) => {
    const [rows, fields] = await con.execute('SELECT * FROM `posts` ORDER BY posts.id DESC  LIMIT ?', [limitt])
    return rows
}

//moi nhat
const list_new_post_user = async () => {
    const [rows, fields] = await con.execute('SELECT * FROM `posts`')
    return rows
}

const list_post = async (from, to) => {
    const [rows, fields] = await con.execute('SELECT * FROM `posts`')
    return rows
}

const insert_post = async (title, content, image, news_id, currentDate) => {
    await con.execute('INSERT INTO `posts`(`title`, `content`, `image`, `news_id`,`create_at`) VALUES (?, ?, ?, ?,?)',[title, content, image, news_id,currentDate])
} 
const detail_post = async (id) => {
    const [rows, fields] = await con.execute('SELECT * FROM posts WHERE posts.id = ?', [id])
    return rows
}

const detail_post_edit = async (id) => {
    const [rows, fields] = await con.execute('SELECT * FROM posts WHERE posts.id = ?', [id])
    return rows
}
const edit_post = async (title, content, image, news_id, id) => {
    await con.execute('UPDATE `posts` SET `title`=?,`content`=?,`image`=?,`news_id`=? where posts.id = ?  ',[title, content, image, news_id, id])
}

const del_post = async (id) => {
    await con.execute('DELETE FROM `posts` WHERE posts.id = ?',[id])
}
export default {list_post,insert_post,detail_post,edit_post,detail_post_edit,del_post,list_hot_post_user,list_new_post_user,list_by_news}