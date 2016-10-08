# DOJO-Node
DOJO Node.js Edwin Alejandro Otalvaro

Estructura Base de datos:

CREATE TABLE restaurant (
    id      SERIAL PRIMARY KEY,
    name        VARCHAR(40),
    city        VARCHAR(40),
    address VARCHAR(100),
    phone       INTEGER
);

CREATE TABLE menu (
    id      SERIAL PRIMARY KEY,
    name        VARCHAR(40),
    description     VARCHAR(40),
    price       INTEGER,
    restaurant  INTEGER NOT NULL references restaurant(id)
);



Rutas:

get localhost:4242/api/restaurants   Retorna todos los restaurantes
get localhost:4242/api/:name          Retorna el restaurante con el nombre dado
post localhost:4242/api/restaurants Crea un nuevo restaurante
delete localhost:4242/api/restaurants/:id  Elimina el resturante con el id dado
put localhost:4242/api/restaurants/:id   Actualiza el restaurante con el id dado

get localhost:4242/api/menus Retorna todos los menus
get localhost:4242/api/restaurants/:restaurant/menu  Retorna los menus del

restaurante indentificado con el id

post localhost:4242/api/restaurants/:restaurant/menus   Crea un menu para el
resturante dado

delete localhost:4242/api/menus/:id Elimina el menu dado

delete localhost:4242/api/restaurants/:restaurant/menu    Elimina todos los menus de un restaurante

put localhost:4242/api/menus Actualiza el menu dado




Nota: Los datos en post deben estar en x-www-form-urlencoded


