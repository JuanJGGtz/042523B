const { Schema, model } = require('mongoose');

const EventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        //Nombre del otro Schema (User.js)
        ref: 'User',
        required: true
    },
});

//sobre escribir el guardado del schema en la bd
/* 
{
    "ok": true,
    "event": {
        "title": "Nota Test",
        "notes": "Probando Nota",
        "start": "1970-01-01T00:00:00.012Z",
        "end": "1970-01-01T00:00:00.023Z",
        "_id": "646071f7728c6ea8735e3e34",
        "user": "645b07e8ac34ea0b49f9c2e6",
        "__v": 0
    }
} 
*/
EventSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

/* 
{
    "ok": true,
    "event": {
        "title": "Nota Test",
        "notes": "Probando Nota",
        "start": "1970-01-01T00:00:00.012Z",
        "end": "1970-01-01T00:00:00.023Z",
        "user": "645b07e8ac34ea0b49f9c2e6",
        "id": "64607314cb221b6e619384aa"
    }
}
*/
module.exports = model('Event', EventSchema);