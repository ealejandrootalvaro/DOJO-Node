var express = require('express');
var router = express.Router();
var db = require('./queries');

router.get("/api/restaurants",db.getAllRestaurants);
router.get("/api/restaurants/:name",db.getRestaurantByName);
router.post("/api/restaurants",db.createRestaurant);
router.delete("/api/restaurants/:id",db.removeRestaurant);
router.put("/api/restaurants/:id",db.updateRestaurant);

router.get("/api/menus",db.getAllMenus);
router.get("/api/restaurants/:restaurant/menu",db.getMenusByRestaurant);
router.post("/api/restaurants/:restaurant/menu",db.createMenu);
router.delete("/api/menus/:id",db.removeMenu);
router.delete("/api/restaurants/:restaurant/menu",db.removeAllRestaurantMenus)
router.put("/api/menus/:id",db.updateMenu);

module.exports = router;
