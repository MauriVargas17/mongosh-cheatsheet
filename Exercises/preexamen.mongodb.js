use("upbmatch")

db.eventos.insertMany([
    {_id: 1, 
        nombre: "futbol chicas", 
        descripcion: "evento en equipos de dos carreras", 
        fecha: new Date("2022-01-01"), 
        equipos: [1, 2],
        id_evento_padre: null
    },
    {_id: 2, 
        nombre: "danza moderna", 
        descripcion: "bailes divertidos", 
        fecha: new Date("2023-05-21"), 
        equipos: [1,2],
        id_evento_padre: null
    },
    {_id: 3, 
        nombre: "adivinanzas entretiempo de baile moderno", 
        descripcion: "adivinan los equipos", 
        fecha: new Date("2023-05-21"), 
        equipos: [1,2],
        id_evento_padre: 2
    },
])

db.equipos.insertMany([
    {_id: 1,
        nombre: "Las rompehuesos",
        integrantes: [
            1, 2
        ]},
    {_id: 2,
        nombre: "Las divinas",
        integrantes: [
            3, 4, 5
        ]},
])

db.puntajes.insertMany([
    {_id: 1, 
        id_evento: 1,
        id_equipo: 1,
        puntaje: 30
    },
    {_id: 2, 
        id_evento: 1,
        id_equipo: 2,
        puntaje: 45
    },
    {_id: 3, 
        id_evento: 2,
        id_equipo: 1,
        puntaje: 60
    },
    {_id: 4, 
        id_evento: 2,
        id_equipo: 2,
        puntaje: 40
    },
    {_id: 5, 
        id_evento: 3,
        id_equipo: 1,
        puntaje: 50
    },
    {_id: 6, 
        id_evento: 3,
        id_equipo: 2,
        puntaje: 55
    },
])

db.carreras.insertMany([
{
    _id: 1,
    nombre: "Ingenieria de Software",
    estudiantes: [1,2
    ]
},
{
    _id: 2,
    nombre: "Administracion de Empresas",
    estudiantes: [1,3
    ]
},
{
    _id: 3,
    nombre: "Ingenieria Civil",
    estudiantes: [3
    ]
},
{
    _id: 4,
    nombre: "Ingenieria Electronica",
    estudiantes: [4, 5
    ]
}
])

db.createCollection("estudiantes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "apellido", "correo_electronico", "carreras"],
            properties: {
                carreras: {
                    bsonType: ["array"],
                    maxItems: 2,
                    items: {
                        bsonType: "int"
                    }
                }
            }
        }
    }
});



db.estudiantes.insertMany([
    {
        _id: 1,
        nombre: "Felipe",
        apellido: "Lotas",
        correo_electronico: "felipelotas@upb.edu.com",
        carreras:[
            1, 2
        ]
    },
    {
        _id: 2,
        nombre: "Lucho",
        apellido: "Portuano",
        correo_electronico: "luchoportuano@upb.edu.com",
        carreras:[
            1
        ]
    },
    {
        _id: 3,
        nombre: "Edgar",
        apellido: "Chado",
        correo_electronico: "edgarchado@upb.edu.com",
        carreras:[
           2, 3
        ]
    },
    {
        _id: 4,
        nombre: "C.B. Linda",
        apellido: "Parada",
        correo_electronico: "cblindaparada@upb.edu.com",
        carreras:[
            4
        ]
    },
    {
        _id: 5,
        nombre: "Abraham",
        apellido: "Helpo Tito",
        correo_electronico: "abrahamhelpotito@upb.edu.com",
        carreras:[
            2,4
        ]
    }
])

db.comentarios.insertMany([
    {
        _id: 1,
        id_estudiante: 1,
        id_evento: 1,
        comentario: "Que evento mas chafa",
        id_carrera_estudiante: [
            1, 2
        ],
        fecha: new Date()
    },
    {
        _id: 2,
        id_estudiante: 2,
        id_evento: 2,
        comentario: "EEEEH LA PROXIMA TE VOY A MATAR",
        id_carrera_estudiante: [
            1
        ],
        fecha: new Date()
    },
    {
        _id: 3,
        id_estudiante: 3,
        id_evento: 3,
        comentario: "saludame admin",
        id_carrera_estudiante: [
            2, 3
         ],
        fecha: new Date()
    },
    {
        _id: 4,
        id_estudiante: 4,
        id_evento: 1,
        comentario: "vamos equipo!!! les partimos el cu**",
        id_carrera_estudiante:[
            4
        ],
        fecha: new Date()
    },
    {
        _id: 5,
        id_estudiante: 4,
        id_evento: 1,
        comentario: "😏",
        id_carrera_estudiante:[
            4
        ],
        fecha: new Date()
    },
    {
        _id: 6,
        id_estudiante: 5,
        id_evento: 1,
        comentario: "xd que paso gente",
        id_carrera_estudiante:[
            2, 4
        ],
        fecha: new Date()
    }
])
 
db.comentarios.createIndex({comentario: 1}, {expireAfterSeconds: 86400})

use("upbmatch")
db.getCollectionNames()

//1.
use("upbmatch")
db.eventos.aggregate([
    {$unwind: "$equipos"},
    {
        $lookup: {
          from: 'equipos',
          localField: 'equipos',
          foreignField: '_id',
          as: 'ref_equipo'
        }
    },
    {
        $unwind: '$ref_equipo'
    },{
        $unwind: '$ref_equipo.integrantes'
    },
    {
        $lookup: {
          from: 'estudiantes',
          localField: 'ref_equipo.integrantes',
          foreignField: '_id',
          as: 'ref_integrante'
        }
    },
    {
        $unwind: '$ref_integrante'
    },
    {
        $unwind: '$ref_integrante.carreras'
    },
    {
        $lookup: {
          from: 'carreras',
          localField: 'ref_integrante.carreras',
          foreignField: '_id',
          as: 'ref_carrera'
        }
      },
      {
        $unwind: '$ref_carrera'
      },
      {
        $group: {
            _id: {
                id_evento: "$nombre",
                carrera: "$ref_carrera.nombre"
            }
        }
      },
      {
        $group: {
            _id: "$_id.carrera",
            total: {$sum: 1}
            
        }
      }
    
])
// Document validation hace que este insert falle, porque le damos 
// mas de dos carreras!
use("upbmatch")
db.estudiantes.insertOne({
    _id: 6,
    nombre: "Bricho",
    apellido: "Riccoto",
    correo_electronico: "brichoto@upb.edu.com",
    carreras:[
        4, 1, 2
    ]
})

//2.
use("upbmatch")
db.estudiantes.find({
    carreras: {
        $in: [1]
    }
    
}, {
    _id: 0,
    nombre: 1,
    apellido: 1})

//3.
use("upbmatch")
db.puntajes.aggregate([
    {
        $lookup: {
          from: 'equipos',
          localField: 'id_equipo',
          foreignField: '_id',
          as: 'ref_equipo'
        },
    },
    {
        $unwind: '$ref_equipo'
    },
    {
        $unwind: '$ref_equipo.integrantes'
    },
    {
        $lookup: {
          from: 'estudiantes',
          localField: 'ref_equipo.integrantes',
          foreignField: '_id',
          as: 'ref_integrante'
        }
    },
    {
        $unwind: '$ref_integrante'
    },
    {
        $unwind: '$ref_integrante.carreras'
    },
    {
        $lookup: {
          from: 'carreras',
          localField: 'ref_integrante.carreras',
          foreignField: '_id',
          as: 'ref_carrera'
        }
    },
    {
        $unwind: '$ref_carrera'
    },
    {
        $lookup: {
            from: 'eventos',
            localField: 'id_evento',
            foreignField: '_id',
            as: 'ref_evento'
        }
    },
    {
        $unwind: '$ref_evento'
    },
    {
        $match: {
            'ref_evento.fecha': { $in: [new Date('2022-01-01'), new Date('2023-01-01')] }
        }
    },
    {
        $group: {
            _id: {
                id_evento: '$ref_evento._id',
                carrera: '$ref_carrera.nombre',
                equipo: '$ref_equipo.nombre',
                puntaje: '$puntaje'
            }
        }
    },
    {
        $group: {
            _id: "$_id.carrera",
            puntaje_en_año: {$sum: '$_id.puntaje'}
        }
    }
    

])

//4.

use("upbmatch")
db.puntajes.aggregate([
    {
        $match: { id_evento: 2 }
    },
    {
        $lookup: {
            from: 'equipos',
            localField: 'id_equipo',
            foreignField: '_id',
            as: 'ref_equipo'
        }
    },
    {
        $unwind: '$ref_equipo'
    },
    {
        $unwind: '$ref_equipo.integrantes'
    },
    {
        $lookup: {
            from: 'estudiantes',
            localField: 'ref_equipo.integrantes',
            foreignField: '_id',
            as: 'ref_estudiante'
        }
    },
    {
        $unwind: '$ref_estudiante'
    },
    {
        $unwind: '$ref_estudiante.carreras'
    },
    {
        $lookup: {
            from: 'carreras',
            localField: 'ref_estudiante.carreras',
            foreignField: '_id',
            as: 'ref_carreras'
        }
    },
    {
        $unwind: '$ref_carreras'
    },
    {
        $group: {
            _id: {
                id_evento: '$id_evento',
                carrera: '$ref_carreras.nombre',
                puntaje: '$puntaje'
            }
        }
    },
    {
        $group: {
            _id: '$_id.carrera',
            puntaje_total_en_evento: {$sum: '$_id.puntaje'}
        }
    }
    
    
])

//5.

use("upbmatch")

db.puntajes.aggregate([
    {
        $match: {
            id_evento: 1
        }
    },
    {
        $group: {
            _id: "$id_evento",
            puntaje_total_dado_en_evento: {$sum: '$puntaje'}
        }
    }
])

//6.

use("upbmatch")

db.comentarios.aggregate([
    {
        $unwind: '$id_carrera_estudiante'
    },
    {
        $lookup: {
            from: 'carreras',
            localField: 'id_carrera_estudiante',
            foreignField: '_id',
            as: 'ref_carrera'
        }
    },
    {
        $unwind: '$ref_carrera'
    },
    {
        $group: {
            _id: '$ref_carrera.nombre',
            total_comentarios: {$sum: 1}
        }
    }
    
    
])

//7.

use("upbmatch")
db.puntajes.aggregate(
    [
        {
            $lookup: {
                from: 'equipos',
                localField: 'id_equipo',
                foreignField: '_id',
                as: 'ref_equipo'
            }
        },
        {
            $unwind: "$ref_equipo"
        },
        {
            $unwind: "$ref_equipo.integrantes"
        },
        {
            $lookup: {
                from: 'estudiantes',
                localField: 'ref_equipo.integrantes',
                foreignField: '_id',
                as: 'ref_integrante'
            }
        },
        {
            $unwind: "$ref_integrante"
        },
        {
            $group: {
                _id: {
                    nombre: "$ref_integrante.nombre",
                    apellido: "$ref_integrante.apellido"
                },
                puntos_obtenidos: {$sum: "$puntaje"}
            }

        },
        {
            $sort: {
                puntos_obtenidos: -1
            }
        },
        {
            $limit: 1
        }
        
    ]
)

//8.
use("upbmatch")
db.eventos.aggregate([
    {
        $match: {
            _id: 2
        }
    },
    {
        $graphLookup: {
            from: 'eventos',
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "id_evento_padre",
            as: "eventos_hijos"
        }
    }
])

//9.

use("upbmatch")
db.puntajes.aggregate([
    {
        $match: {
            id_evento: 1
        }
    },
    {
        $lookup: {
            from: 'equipos',
            localField: 'id_equipo',
            foreignField: '_id',
            as: 'ref_equipo'
        }
    },
    {
        $unwind: "$ref_equipo"
    },
    {
        $unwind: "$ref_equipo.integrantes"
    },
    {
        $lookup: {
            from: 'estudiantes',
            localField: 'ref_equipo.integrantes',
            foreignField: '_id',
            as: 'ref_integrante'
        }
    },
    {
        $unwind: "$ref_integrante"
    },
    {
        $unwind: "$ref_integrante.carreras"
    },
    {
        $lookup: {
            from: 'carreras',
            localField: 'ref_integrante.carreras',
            foreignField: '_id',
            as: 'ref_carreras'
        }
    },
    {
        $unwind: "$ref_carreras"
    },
    {
        $group: {
            _id: {
                id_evento: '$id_evento',
                carrera: '$ref_carreras.nombre',
                puntaje: '$puntaje'
            }
        }
    },
    {
        $group: {
            _id: '$_id.carrera',
            puntaje_obtenido: {$sum: '$_id.puntaje'}
        }
    },
    {
        $sort: {
            puntaje_obtenido: -1
        }
    },
    {
        $limit: 1
    }
])
