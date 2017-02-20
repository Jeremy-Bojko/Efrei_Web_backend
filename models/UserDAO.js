const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.accessor.query('SELECT * FROM users WHERE id=${id}', 
			{
				id: id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error; 
			})

	},

	getAll() {
		return DB.accessor.query('SELECT * FROM users')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	getCharactersById(id) {
		return DB.accessor.query(
			'SELECT t1.id, t1.name, t1.user_id, t1.class, t1.position FROM characters t1 INNER JOIN users t2 ON t1.user_id = t2.id WHERE t2.id = ${id}', 
			{
				id : id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	create(username, email) {
		return DB.accessor.query(
			'INSERT INTO users(name, email) VALUES(${username}, ${email}) RETURNING *',
			{
				username: username,
				email	: email
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	deleteById(id) {
		return DB.accessor.query(
			'DELETE FROM users WHERE id=${id}',
			{
				id: id
			})
			.then(() => {
				return;
			})
			.catch((error) => {
				throw error;
			})
	},

	updateById(id, name, email, alliance_id) {
		return DB.accessor.query(
			'UPDATE users SET name=${name}, email=${email}, alliance_id=${alliance_id} WHERE id=${id} RETURNING *',
			{
				id			: id,
				name		: name,
				email		: email, 
				alliance_id : alliance_id
			})
			.then((user) => {
				return user;
			})
			.catch((error) => {
				throw error;
			})
	}
}