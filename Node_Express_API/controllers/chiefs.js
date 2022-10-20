import { v4 as uuidv4 } from 'uuid';
import db from '../database.js';
let chiefs = [];

export const getChiefs = (req, res) => {
    console.log("get ?")
    db.query("SELECT * FROM chief", [], (error, resultat) => {
        if(error){
            console.log(error);
        }else {
            console.log(resultat[0]);
            res.send(resultat);
            
        }
    })
};

export const createChief = (req, res) => {
    /*console.log(chief);
    chiefs.push({...chief, id: uuidv4(), description:"none", chief:"Oui", notif:"No", dispo:"Yes", reserveBy:"", grade:0});

    res.send(`User with the username ${chief.firstName} added to the database!`);*/

    const chief = req.body;
    console.log(chief)
    db.query("INSERT INTO Chief (id, firstName, description, notif, dispo, reserveBy, grade, lastName, chief, adress, email, phoneNumber, passwordP, passwordVerif, reserve, typeOfFood) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [uuidv4(), chief.firstName, "none", "No", "Yes", "n", 0, chief.lastName, "Oui", chief.adress, chief.email, chief.phoneNumber, chief.password, chief.passwordVerif, "mistake", chief.typeOfFood]);

};

export const getChief = (req, res)=>{
    /*const {email} = req.params;

    const foundChief = chiefs.find((chief) => chief.email == email);

    res.send(foundChief);*/

    const {email} = req.params;
    db.query(`SELECT * FROM chief WHERE email = '${email}'`, [], (error, resultat)=>{
        if(error){
            console.log(error);
        }else {
            console.log("res",resultat[0]);
            res.send(resultat);
            
        }
    });
};

export const deleteChief = (req, res) => {
    const {email} = req.params;

    chiefs = chiefs.filter((chief)=> chief.email != email);

    res.send(`User with the id ${id} deleted from the database`)

};

export const patchChief = (req, res) => {
    /*const {Id} = req.params;
    const {phoneNumber, email, password, description, typeOfFood, notif, dispo, reserveBy, grade} = req.body;

    const chief = chiefs.find((chief) => chief.Id == Id);

    if(phoneNumber) chief.phoneNumber = phoneNumber;
    if(email) chief.email = email;
    if(password) {
        chief.password = password;
        chief.passwordVerif = password;
    };
    if(description) chief.description = description;
    if(typeOfFood) chief.typeOfFood = typeOfFood;
    if(notif) chief.notif = notif;
    if(dispo) chief.dispo = dispo;
    if(reserveBy) chief.reserveBy = reserveBy;
    if(grade) chief.grade = grade;

    res.send(`User with the id ${Id} has been updated`)*/

    console.log(req.params['email']);
    const {phoneNumber, email, password, description, typeOfFood, notif, dispo, reserveBy, grade} = req.body;
    const Id = req.params['email']
    
    if(phoneNumber)  db.query(`UPDATE chief SET phoneNumber = '${phoneNumber}' WHERE email = '${Id}'`);
    if(email) db.query(`UPDATE chief SET email = '${email}' WHERE email = '${Id}'`);;
    if(password) {
        db.query(`UPDATE chief SET passwordP = '${password}' WHERE email = '${Id}'`);
        db.query(`UPDATE chief SET passwordVerif = '${password}' WHERE email = '${Id}'`);
    }
    if(description) db.query(`UPDATE chief SET description = '${description}' WHERE email = '${Id}'`);
    if(typeOfFood) db.query(`UPDATE chief SET typeOfFood = '${typeOfFood}' WHERE email = '${Id}'`);
    if(notif) db.query(`UPDATE chief SET notif = '${notif}' WHERE email = '${Id}'`);
    if(dispo) db.query(`UPDATE chief SET dispo = '${dispo}' WHERE email = '${Id}'`);
    if(reserveBy) db.query(`UPDATE chief SET reserveBy = '${reserveBy}' WHERE email = '${Id}'`);
    if(grade) db.query(`UPDATE chief SET grade = '${grade}' WHERE email = '${Id}'`);

    res.send(`User with the id ${Id} has been updated`)

};




