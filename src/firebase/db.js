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