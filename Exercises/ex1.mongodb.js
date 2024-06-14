use("ex");
db.usuarios.insertMany([
    { _id: 1, nombre: "John", apellido: "Doe", fecha_nacimiento: new Date("1980-01-01") },
    { _id: 2, nombre: "Jane", apellido: "Doe", fecha_nacimiento: new Date("1980-04-01") },
    { _id: 3, nombre: "Bob", apellido: "Smith", fecha_nacimiento: new Date("1985-01-01") },
    { _id: 4, nombre: "Alice", apellido: "Smith", fecha_nacimiento: new Date("1985-04-01") },
    { _id: 5, nombre: "Mike", apellido: "Johnson", fecha_nacimiento: new Date("1990-01-01") },
    { _id: 6, nombre: "Sarah", apellido: "Johnson", fecha_nacimiento: new Date("1990-04-01") },
    { _id: 7, nombre: "Emily", apellido: "Brown", fecha_nacimiento: new Date("1995-01-01") },
    { _id: 8, nombre: "David", apellido: "Brown", fecha_nacimiento: new Date("1995-04-01") },
  ]); 

db.comentarios.insertMany([
    { _id: 1, userId: 1, comentario: "Este es un comentario de John Doe.", date: new Date("2022-01-01") },
    { _id: 2, userId: 2, comentario: "Este es un comentario de Jane Doe.", date: new Date("2022-01-02") },
    { _id: 3, userId: 3, comentario: "Este es un comentario de Bob Smith.", date: new Date("2022-01-03") },
    { _id: 4, userId: 4, comentario: "Este es un comentario de Alice Smith.", date: new Date("2022-01-04") },
    { _id: 5, userId: 5, comentario: "Este es un comentario de Mike Johnson.", date: new Date("2022-01-05") },
    { _id: 6, userId: 6, comentario: "Este es un comentario de Sarah Johnson.", date: new Date("2022-01-06") },
    { _id: 7, userId: 7, comentario: "Este es un comentario de Emily Brown.", date: new Date("2022-01-07") },
    { _id: 8, userId: 1, comentario: "La vida no tiene sentido", date: new Date("2022-01-08") },
    { _id: 9, userId: 2, comentario: "vale madre todo", date: new Date("2022-01-09") },
  ]);

  use("ex");

  db.usuarios.aggregate([
    {
      $lookup: {
        from: "comentarios",
        localField: "_id",
        foreignField: "userId",
        as: "sus_comentarios"
      }
    }   
  ]);

  use("ex");

  db.comentarios.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "userId",
        foreignField: "_id",
        as: "su_usuario"
      },
      
    },
    {
        $unwind: "$su_usuario"
    } ,  
    {
        $project: {
            'nombre': '$su_usuario.nombre',
            _id: 0,
            comentario: 1
          }
    },
    
  ]);



  use("quant");

  

