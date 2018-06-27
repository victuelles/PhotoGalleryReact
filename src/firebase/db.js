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
//clients
export const getAllClients=(uid)=>
    db.ref(`clients/${uid}`).once('value')

export const updateClient=(uid,clientID,email,fullname,phone)=>
    db.ref(`clients/${uid}/${clientID}`).update({
        email,fullname,phone
    })

export const deleteClient=(uid,clientID,isDeleted)=>
    db.ref(`clients/${uid}/${clientID}`).update({
        isDeleted
    })    
//events

export const getAllEvents=(uid)=>
    db.ref(`events/${uid}`).once('value')

export const getEvent=(uid,eventid)=>
    db.ref(`events/${uid}/${eventid}`).once('value')

export const updateEvent=(uid,eventid,date,description,location,time,title)=>
db.ref(`events/${uid}/${eventid}`).update({
    date,description,location,time,title
    })

export const deleteEvent=(uid,eventid,isDeleted)=>
    db.ref(`events/${uid}/${eventid}`).update({
        isDeleted
    }) 
//events photos

export const getEventPhotos=(uid,eventID)=>
    db.ref(`uploads/${uid}/${eventID}`).once('value')