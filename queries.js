var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var conectionString = 'postgres://gwqchezs:ZD1W-Jzf3vKPG5Qt8uYNdEqr4OqxKjUq@elmer.db.elephantsql.com:5432/gwqchezs';
var db = pgp(conectionString);

function getAllRestaurants(req,res,next){
	db.any('select * from restaurant')
	.then(function(data){
		res.status(200)
		.json({
			status: "Exitoso",
			data: data,
			message: "Recuperados todos los restaurantes"
		});
	})
	.catch(function(err){
		return next(err);
	});
}

function getRestaurantByName(req,res,next){
	var name = req.params.name;
	db.any('select * from restaurant where name = $1',name)
	.then(function(data){
		res.status(200)
		.json({
			status: "Exitoso",
			data: data,
			message: "Recuperados restaurantes por nombre"
		});
	})
	.catch(function(err){
		return next(err);
	});
}


function createRestaurant(req,res,next){

	db.none('insert into restaurant(name,city,address,phone)' + ' values($1,$2,$3,$4)',[req.body.name,req.body.city,req.body.address,parseInt(req.body.phone)])
	.then(function(){
		res.status(200)
		.json({
			status: "Exitoso",
			message: "Insertado un restaurante"
		});
	})
	.catch(function(err){
		return next(err);
	});
}


function removeRestaurant(req,res,next){
	var restaurantID = parseInt(req.params.id);
	db.result('delete from restaurant where id = $1', restaurantID).then(function (){
		res.status(200).json({
			status: 'Exitoso',
			message: 'Removido un restaurante'
		});
	}).catch(function(err){
		return next(err);
	});
};


function updateRestaurant(req,res,next){

	db.none('update restaurant set name=$1, city=$2, address=$3, phone=$4 where id=$5',[req.body.name,req.body.city,req.body.address,parseInt(req.body.phone),parseInt(req.params.id)])
	.then(function(){
		res.status(200)
		.json({
			status: "Exitoso",
			message: "Restaurante actualizado"
		});
	})
	.catch(function(err){
		return next(err);
	});
}

function createMenu(req,res,next){
	db.none('insert into menu(name,description,price,restaurant)'+ 'values($1,$2,$3,$4)',[req.body.name,req.body.description,parseInt(req.body.price),parseInt(req.params.restaurant)])
	.then(function(){
		res.status(200)
		.json({
			status: "Exitoso",
			message: "Menu creado"
		});
	})
	.catch(function(err){
		return next(err);
	});
}

function getMenusByRestaurant(req,res,next){
	var restaurant = parseInt(req.params.restaurant);
	db.any("select * from menu where restaurant = $1",restaurant)
	.then(function(data){
		res.status(200)
		.json({
			status:"Exitoso",
			data: data,
			message: "Todos los menus del restaurante dado"
		});
	})
	.catch(function(err){
		return next(err);
	});
}

function removeMenu(req,res,next){
	var menuId = parseInt(req.params.id);

	db.result("delete from menu where id = $1",menuId)
	.then(function(){
		res.status(200)
		.json({
			status: "Exitoso",
			message: "Menu eliminado"
		});
	}).catch(function(err){
		return next(err);
	});
}

function removeAllRestaurantMenus(req,res,next){
	var restaurantId = parseInt(req.params.restaurant);

	db.result("delete from menu where restaurant = $1",restaurantId)
	.then(function(){
		res.status(200)
		.json({
			status: "Exitoso",
			message: "Eliminados todos los menus del restaurante"
		});
	}).catch(function(err){
		return next(err);
	});
}

function updateMenu(req,res,next){

	var menuId = parseInt(req.params.id);

	db.none("update menu set name = $1, description = $2, price = $3 where id = $4",[req.body.name,req.body.description,parseInt(req.body.price),menuId])
	.then(function(){
		res.status(200)
		.json({
			status: "Exitoso",
			message: "Menu actualizado"
		});
	}).catch(function(err){
		return next(err);
	});
}

function getAllMenus(req,res,next){
	db.any('select * from menu')
	.then(function(data){
		res.status(200)
		.json({
			status: "Exitoso",
			data: data,
			message: "Recuperados todos los menus"
		});
	})
	.catch(function(err){
		return next(err);
	});
}


module.exports = {
	getAllRestaurants: getAllRestaurants,
	createRestaurant: createRestaurant,
	getRestaurantByName: getRestaurantByName,
	removeRestaurant: removeRestaurant,
	updateRestaurant: updateRestaurant,
	createMenu: createMenu,
	getMenusByRestaurant: getMenusByRestaurant,
	removeMenu: removeMenu,
	removeAllRestaurantMenus: removeAllRestaurantMenus,
	updateMenu: updateMenu,
	getAllMenus, getAllMenus

}
