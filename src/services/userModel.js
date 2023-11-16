import con from "./../config/connectDB"

const insert_user = async (username, password, fullname, address, sex, email, groupid) => {
    await con.execute('INSERT INTO `users`(`username`, `password`, `fullname`, `address`, `sex`, `email`, `groupid`) VALUES (?,?,?,?,?,?,?)',[username, password, fullname, address, sex, email, groupid])
} 

const list_user = async (from, to) => {
    const [rows, fields] = await con.execute('SELECT * FROM `users`')
    return rows
} 

const detail_user = async (name) => {
    const [rows, fields] = await con.execute('SELECT * FROM users WHERE users.username LIKE ?', [name])
    return rows
} 

const edit_user = async (username, password, fullname, address, sex, email, groupid) => {
    await con.execute('UPDATE `users` SET `password`=?,`fullname`=?,`address`=?,`sex`=?,`email`=?,`groupid`=? WHERE users.username = ?',[password, fullname, address, sex, email, groupid, username])
}

const del_user = async (username) => {
    await con.execute('DELETE FROM `users` WHERE users.username = ?',[username])
}

const auth = async (username) => {
    const [rows, fields] = await con.execute('SELECT * FROM users WHERE users.username LIKE ?', [username])
    return rows
}

const insert_user_Users = async (username, password, fullname, address, groupid) => {
    await con.execute('INSERT INTO `users`(`username`, `password`, `fullname`, `address`, `groupid`) VALUES (?,?,?,?,?)',[username, password, fullname, address, groupid])
} 


export default {insert_user, list_user, detail_user, edit_user, del_user, auth,insert_user_Users}