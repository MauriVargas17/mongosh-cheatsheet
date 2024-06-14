use("upb");

db.hierarchy.insertMany([
    { _id: 1, name: "El liza", parent: null },
    { _id: 2, name: "renuco", parent: 1 },
    { _id: 3, name: "mauri", parent: 1 },
    { _id: 4, name: "peri", parent: 3 },
    { _id: 5, name: "jc", parent: 2 },
    { _id: 6, name: "pol", parent: 4 },
    { _id: 7, name: "toditos", parent: 6 }
  ]);

  use("upb");
db.hierarchy.aggregate([
  {
    $graphLookup: {
      from: "hierarchy",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "parent",
      as: "hijitas"
    }
  }
]);

use("upb");

db.amigos.insertMany([
    { _id: 1, nombre: "El liza", amigos: [2, 3,7] },
    { _id: 2, nombre: "renuco", amigos: [5,1] },
    { _id: 3, nombre: "mauri", amigos: [4,1,2] },
    { _id: 4, nombre: "peri", amigos: [6] },
    { _id: 5, nombre: "jc", amigos: [7] },
    { _id: 6, nombre: "pol", amigos: [4] },
    { _id: 7, nombre: "sebi", amigos: [5,4,1] }
])

use("upb");
db.amigos.aggregate([
  {
    $graphLookup: {
      from: "amigos",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "amigos",
      as: "amigos"
    }
  }
])

use("ventitas");

db.clientes.insertMany([
    {id: 1, nombre: "liza", apellido: "peres"},
    {id: 2, nombre: "renuco", apellido: "jimenez"},
    {id: 3, nombre: "pol", apellido: "jimenez"},
])

db.producto.insertMany([
    {id: 1, nombre: "silla", precio: 1000},
    {id: 2, nombre: "mesa", precio: 2000},
    {id: 3, nombre: "sillon",precio: 3000},
    {id: 4, nombre: "sofa",precio: 4000},
    {id: 5, nombre: "mesa redonda", precio: 5000},
    {id: 6, nombre: "sofa cuadrado",precio: 6000},
    {id: 7, nombre: "sillon redondo",precio: 7000},
    {id: 8, nombre: "dildo",precio: 8000},
])

db.ventas.insertMany([
    {id_cliente: 1, id_producto: 1, cantidad: 2, fecha: new Date("2024-09-01")},
    {id_cliente: 2, id_producto: 2, cantidad: 1, fecha: new Date("2024-02-02")},
    {id_cliente: 2, id_producto: 3, cantidad: 4, fecha: new Date("2024-01-03")},
    {id_cliente: 1, id_producto: 4, cantidad: 1, fecha: new Date("2024-02-04")},
    {id_cliente: 1, id_producto: 5, cantidad: 6, fecha: new Date("2024-01-05")},
    {id_cliente: 3, id_producto: 6, cantidad: 2, fecha: new Date("2024-07-06")},
    {id_cliente: 3, id_producto: 7, cantidad: 8, fecha: new Date("2024-08-07")},
    {id_cliente: 2, id_producto: 8, cantidad: 13, fecha: new Date("2024-01-08")}
])

use("ventitas");
db.ventas.aggregate([
    {
        $graphLookup: {
            from: "clientes",
            startWith: "$id_cliente",
            connectFromField: "id",
            connectToField: "id",
            as: "cliente"
        }
    },
    { $graphLookup: { from: "producto", startWith: "$id_producto", connectFromField: "id", connectToField: "id", as: "producto" } },
    {
        $unwind: "$cliente"
    },
    {
        $unwind: "$producto"
    },
    {
        $group: {
            _id: "$cliente.nombre",
            total: { $sum: { $multiply: ["$producto.precio", "$cantidad"] } },
            avg: { $avg: "$producto.precio" }
        }
    }
   
])

use("indices")
db.chat.insertMany([
    {contenido: "ciao", created_at: new Date(), id_emisor: 1, id_receptor: 2},
    {contenido: "que quieres", created_at: new Date(), id_emisor: 2, id_receptor: 1},
    {contenido: "hola", created_at: new Date(), id_emisor: 1, id_receptor: 2},
    {contenido: "hola", created_at: new Date(), id_emisor: 2, id_receptor: 1},
    {contenido: "que tal", created_at: new Date(), id_emisor: 1, id_receptor: 2},
    {contenido: "chido", created_at: new Date(), id_emisor: 2, id_receptor: 1},
    {contenido: "como estas", created_at: new Date(), id_emisor: 1, id_receptor: 2},
    {contenido: "bien", created_at: new Date(), id_emisor: 2, id_receptor: 1}

])

use("indices")


db.chat.createIndex(
    { created_at: 1 },
    { expireAfterSeconds: 20 }
)


use("indices")
db.chat.insertMany([
    {contenido: "me vale", created_at: new Date(), id_emisor: 1, id_receptor: 2},
    {contenido: "a mi mas", created_at: new Date(), id_emisor: 2, id_receptor: 1},

])

use("indices")
db.chat.find()

use("indices")
db.estudiantes.insertMany([
    {codigo: 12312, nombre: 'Juan', apellidos: 'Perez'},
    {codigo: 12313, nombre: 'Maria', apellidos: 'Lopez'},
    {codigo: 12314, nombre: 'Pedro', apellidos: 'Gonzalez'},
    {codigo: 12315, nombre: 'Ana', apellidos: 'Sanchez'},]
)
use("indices")
db.estudiantes.createIndex(
    { codigo: 1 },
    { unique: true }
)
use("indices")

db.estudiantes.createIndex(
    { codigo: -1 },
)

db.estudiantes.find()

use("indices")
db.estudiantes.dropIndex("codigo_1")


//--------

use("admin")


db.createUser(
    {user: "bicho", 
    pwd: "bicho", 
    roles: [{ role: "readWrite", db: "biblioteca" }]
})
