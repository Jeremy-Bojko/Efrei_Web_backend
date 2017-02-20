const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.accessor.query('SELECT * FROM characters WHERE id=${id}', 
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
		return DB.accessor.query('SELECT * FROM characters')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	getAllByClass(character_class) {
		return DB.accessor.query('SELECT * FROM characters WHERE class=${character_class}',
			{
				character_class: character_class
			})
			.then((characters) => {
				return characters;
			})
			.catch((error) => {
				throw error;
			})
	}, 

	getAlliesByRadius(id, radius) {
		return DB.accessor.query(
			'SELECT t1.id, t1.name, t1.user_id, t1.class, t1.position FROM characters t1 INNER JOIN users t2 ON t1.user_id = t2.id INNER JOIN alliances t3 ON t2.alliance_id = t3.id WHERE t3.id =${id} AND 6367445*acos(sin(radians((SELECT position[0] FROM characters WHERE id = 1)))*sin(radians(t1.position[0]))+cos(radians((SELECT position[0] FROM characters WHERE id = 1)))*cos(radians(t1.position[0]))*cos(radians((SELECT position[1] FROM characters WHERE id = 1))- radians(t1.position[1]))) < ${radius} AND 6367445*acos(sin(radians((SELECT position[0] FROM characters WHERE id = 1)))*sin(radians(t1.position[0]))+cos(radians((SELECT position[0] FROM characters WHERE id = 1)))*cos(radians(t1.position[0]))*cos(radians((SELECT position[1] FROM characters WHERE id = 1))- radians(t1.position[1]))) > 0',
			{
				id 		: id, 
				radius 	: radius
			})
			.then((characters) => {
				return characters; 
			})
			.catch((error) => {
				throw error;
			})
	},

	getEnnemiesByRadius(id, radius) {
		return DB.accessor.query(
			'SELECT t1.id, t1.name, t1.user_id, t1.class, t1.position FROM characters t1 INNER JOIN users t2 ON t1.user_id = t2.id INNER JOIN alliances t3 ON t2.alliance_id = t3.id WHERE t3.id !=${id} AND 6367445*acos(sin(radians((SELECT position[0] FROM characters WHERE id = 1)))*sin(radians(t1.position[0]))+cos(radians((SELECT position[0] FROM characters WHERE id = 1)))*cos(radians(t1.position[0]))*cos(radians((SELECT position[1] FROM characters WHERE id = 1))- radians(t1.position[1]))) < ${radius} AND 6367445*acos(sin(radians((SELECT position[0] FROM characters WHERE id = 1)))*sin(radians(t1.position[0]))+cos(radians((SELECT position[0] FROM characters WHERE id = 1)))*cos(radians(t1.position[0]))*cos(radians((SELECT position[1] FROM characters WHERE id = 1))- radians(t1.position[1]))) > 0 ORDER BY 6367445*acos(sin(radians((SELECT position[0] FROM characters WHERE id = 1)))*sin(radians(t1.position[0]))+cos(radians((SELECT position[0] FROM characters WHERE id = 1)))*cos(radians(t1.position[0]))*cos(radians((SELECT position[1] FROM characters WHERE id = 1))- radians(t1.position[1])))',
			{
				id 		: id, 
				radius 	: radius
			})
			.then((characters) => {
				return characters; 
			})
			.catch((error) => {
				throw error;
			})
	},

	create(name, class_name, user_id, position) {
		return DB.accessor.query(
			'INSERT INTO characters(name, class, user_id, position) VALUES(${name}, ${class_name}, ${user_id}, point(${positionX},${positionY}) ) RETURNING *',
			{
				name 		: name,
				class_name	: class_name,
				user_id		: user_id, 
				positionX 	: position.x,
				positionY	: position.y 
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
			'DELETE FROM characters WHERE id=${id}',
			//'DELETE FROM characters WHERE id=13',
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

	updateById(id, name, class_name, user_id, position) {
		return DB.accessor.query(
			'UPDATE characters SET name=${name}, class=${class_name}, user_id=${user_id}, position=point(${positionX}, ${positionY})  WHERE id=${id} RETURNING *',
			{
				id			: id,
				name 		: name,
				class_name	: class_name,
				user_id		: user_id, 
				positionX 	: position.x,
				positionY	: position.y  
			})
			.then((character) => {
				return character;
			})
			.catch((error) => {
				throw error;
			})
	}
}