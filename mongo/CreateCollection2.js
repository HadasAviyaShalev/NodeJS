db.createCollection("Presence",{
validator:{
$jsonSchema: {
    bsonType: "object",
required: ["WorkerIdP","date","start","end"],
properties: {
WorkerIdP: {
bsonType:"string",
description: "must be a string and is required"
},
date: {
bsonType:"date",
description: "must be a string and is required"
},
start: {
bsonType:"string",
description: "must be a string and is required"
},
end: {
bsonType:"string",
description: "must be a string and is required"
}

}
}
}
})

