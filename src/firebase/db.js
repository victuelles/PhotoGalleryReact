import {db} from './firebase'

//User API

export const doCreateUser=(id,username,email)=>
    db.ref(`users/${id}`).set({
            username,email,id
    })

export const onceGetUsers=()=>
    db.ref(`users`).once('value')

export const getUser=(id)=>
    db.ref(`users/${id}`).once('value')

    

export const updateUser=(id,username,bday,phone,country,city,street,zipcode)=>
    db.ref(`users/${id}`).update({
        username,bday,phone,country,city,street,zipcode
    })

//events

export const getAllEvents=(uid)=>
    db.ref(`events/${uid}`).once('value')

export const getEvent=(uid,eventid)=>
    db.ref(`events/${uid}/${eventid}`).once('value')

//events photos

export const getEventPhotos=(uid,eventID)=>
    db.ref(`uploads/${uid}/${eventID}`).once('value')