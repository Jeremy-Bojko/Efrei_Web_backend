const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.accessor.query('SELECT * FROM alliances WHERE id=${id}', 
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
		return DB.accessor.query('SELECT * FROM alliances')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	create(name) {
		return DB.accessor.query(
			'INSERT INTO alliances(name) VALUES(${name}) RETURNING *',
			{
				name: name
			})
			.then((alliance) => {
				return alliance;
			})
			.catch((error) => {
				throw error;
			})
	},

	deleteById(id) {
		return DB.accessor.query(
			'DELETE FROM alliances WHERE id=${id}',
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

	updateById(id, name) {
		return DB.accessor.query(
			'UPDATE alliances SET name=${name} WHERE id=${id} RETURNING *',
			{
				id	: id,
				name: name
			})
			.then((alliance) => {
				return alliance;
			})
			.catch((error) => {
				throw error;
			})
	}, 

	getUsersByAlliance(alliance_id) { 
		return DB.accessor.query(
			'SELECT * FROM users WHERE alliance_id=${alliance_id}', 
			{
				alliance_id : alliance_id
			})
			.then((users) => {
				return users; 
			})
			.catch((error) => {
				throw error; 
			})
	}, 

	getCharactersByAllianceId(alliance_id) { 
		return DB.accessor.query(
			'SELECT t1.id, t1.name, t1.user_id, t1.class, t1.position FROM characters t1 INNER JOIN users t2 ON t1.user_id = t2.id INNER JOIN alliances t3 ON t2.alliance_id = t3.id WHERE t3.id = ${alliance_id}',
			{
				alliance_id : alliance_id
			})
			.then((users) => {
				return users; 
			})
			.catch((error) => {
				throw error; 
			})
	},

	getCharactersByAllianceIdByClass(alliance_id, character_class) {
		return DB.accessor.query(
			'SELECT t1.id, t1.name, t1.user_id, t1.class, t1.position FROM characters t1 INNER JOIN users t2 ON t1.user_id = t2.id INNER JOIN alliances t3 ON t3.id = t2.alliance_id WHERE t2.alliance_id=${alliance_id} AND t1.class=${character_class};',
			{
				alliance_id 	: alliance_id,
				character_class	: character_class
			})
			.then((users) => {
				return users;
			})
			.catch((error) => {
				throw error;
			}
		)
	}
}