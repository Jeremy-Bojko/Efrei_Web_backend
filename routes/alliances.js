var express = require('express');
var router = express.Router();
const AlliancesDAO = require('../models/AlliancesDAO');


/* GET users listing. */
router.get('/', function(req, res, next) {
	AlliancesDAO.getAll()
	.then((alliances) => {
		res.status(200)
		.json({
			status 		: 'success', 
			alliances 	: alliances
		});
	})
	.catch((error) => {
		res.status(500)
		.json({
			status : 'Error', 
			message : error
		}); 
	})
});

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	
	AlliancesDAO.getById(id)
	.then((alliance) => {
		res.status(200)
		.json({
			status 		: 'success', 
			alliance 	: alliance[0]
		});
	})
	.catch((error) => {
		res.status(500)
		.json({
			status : 'Error', 
			message : error
		}); 
	})
});

router.get('/:id/users', function(req, res, next) {
	var id = parseInt(req.params.id); 

	AlliancesDAO.getUsersByAlliance(id)
	.then((users) => {
		res.status(200)
		.json({
			status 	: 'success', 
			users 	: users 
		});
	})
	.catch((error) => {
		res.status(500)
		.json({
			status : 'Error', 
			message : error
		});  
	})
});

router.get('/:id/characters/:class', function(req, res, next) {
	var id = parseInt(req.params.id);
	var character_class = req.params.class;

	AlliancesDAO.getCharactersByAllianceIdByClass(id, character_class)
	.then((characters) => {
		res.status(200)
		.json({
			status : 'success', 
			characters : characters
		});
	})
	.catch((error) => {
		res.status(500)
		.json({
			status : 'Error', 
			message : error
		});
	})
});

router.get('/:id/characters', function(req, res, next) {
	var id = parseInt(req.params.id); 

	AlliancesDAO.getCharactersByAllianceId(id)
	.then((characters) =>{
		res.status(200)
		.json({
			status : 'success', 
			characters : characters
		});
	})
	.catch((error) => {
		res.status(500)
		.json({
			status : 'Error', 
			message : error
		}); 
	})
});

router.post('/', function(req, res, next) {
	var name = req.body.alliance.name;

	if (name === undefined) {
		res.status(422);
		res.send('Name is undefined.');

	} else {
		AlliancesDAO.create(name)
		.then((result) => {
			res.status(200)
			.json({
				status 		: 'success', 
				message 	: 'Inserted one alliance', 
				alliance 	: result[0]
			});
		})
		.catch((error) => {
			res.status(500)
			.json({
				status : 'Error', 
				message : error
			});
		})
	}
});

router.delete('/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	
	AlliancesDAO.deleteById(id)
	.then(() => {
		res.status(200)
		.json({
			status 	: 'success', 
			message : []
		});
	})
	.catch((error) => {
		res.status(500)
		.json({
			status : 'Error', 
			message : error
		});
	})
});

router.put('/:id', function(req, res, next) {
	var id 		= parseInt(req.params.id);
	var name 	= req.body.alliance.name;

	if (name === undefined) {
		res.status(422);
		res.send('Name is undefined');

	} else {
		AlliancesDAO.updateById(id, name)
		.then((result) => {
			res.status(200)
			.json({ 
				status : 'success', 
				message : 'modified a alliance', 
				alliance : result[0]
			}); 
		})
		.catch((error) => {
			res.status(500)
			.json({
				status : 'Error', 
				message : error
			});
		})
	}
})

module.exports = router;
