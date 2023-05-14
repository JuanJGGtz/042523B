/**
 * Event Routes
 * /api/events
 */

const { response } = require('express');
const Event = require('../models/Event');


const getEvent = async (req, res = response) => {

    //const events = await Event.find({});
    const events = await Event.find().populate('user', 'name');

    return res.status(400).json({
        ok: false,
        events: events
    });

}
const createEvent = async (req, res = response) => {
    const event = new Event(req.body);
    try {

        event.user = req.uid;
        const eventSaving = await event.save();

        return res.status(200).json({
            ok: true,
            event: eventSaving
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


}
const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;


    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe por ese Id'
            });
        }


        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }


        const newEvent = {
            ...req.body,
            user: uid
        }

        const enventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        return res.status(200).json({
            ok: true,
            msg: 'updateEvent',
            event: enventUpdated
        });

    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Hable con el admin',
            eventId,
            error
        });
    }



}
const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;


    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe por ese Id'
            });
        }


        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos de borrar este evento'
            });
        }


        await Event.findByIdAndDelete(eventId,);

        return res.status(200).json({
            ok: true,
            msg: 'Delete event',
        });

    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Hable con el admin',
            eventId,
            error
        });
    }
}


module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};