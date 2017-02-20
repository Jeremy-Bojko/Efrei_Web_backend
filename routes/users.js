var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UserDAO');


/* GET users listing. */
router.get('/', function(req, res, next) {
	UserDAO.getAll()
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
	});
});

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	
	UserDAO.getById(id)
	.then((user) => {
		res.status(200)
        .json({
          status	: 'success',
          user 		: user[0]
        });
	})
	.catch((error) => {
		res.status(500)
		.json({
			status : 'Error', 
			message : error
		});
	});
});

router.get('/:id/characters', function(req, res, next) {
	var id = parseInt(req.params.id);
	
	UserDAO.getCharactersById(id)
	.then((characters) => {
		res.status(200)
        .json({
          status		: 'success',
          characters 	: characters 
        });
	})
	.catch((error) => {
		res.status(500)
		.json({
			status : 'Error', 
			message : error
		});
	});
});

router.post('/', function(req, res, next) {
	var name 	= req.body.user.name;
	var email	= req.body.user.email;

	if ((name === undefined) || (email === undefined)) {
		res.status(422); 
		res.send('name or email is invalid.');

	} else {
		UserDAO.create(name, email)
		.then((result) => {
			res.status(200)
			.json({
				status 	: 'success', 
				message	: 'Inserted one user',
				user 	: result[0] 
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
	
	UserDAO.deleteById(id)
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
	var id		 	= parseInt(req.params.id);
	var name 		= req.body.user.name;
	var email		= req.body.user.email; 
	var alliance_id	= req.body.user.alliance_id; 

	if (name === undefined || email === undefined || alliance_id === undefined) {
		res.status(500);
		res.send('One or more textfield are undefined');

	} else {
		UserDAO.updateById(id, name, email, alliance_id)
		.then((user) => {
			res.status(200)
			.json({
				status 	: 'success', 
				message : 'modified a user', 
				user 	: user[0]
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
