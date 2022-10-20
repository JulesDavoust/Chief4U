import { v4 as uuidv4 } from 'uuid';
import db from '../database.js';
let users = [];

export const getUsers = (req, res) => {
    console.log("get ?")
    db.query("SELECT * FROM users", [], (error, resultat) => {
        if(error){
            console.log(error);
        }else {
            console.log(resultat[0]);
            res.send(resultat);
            
        }
    })
};

export const createUser = (req, res) => {
    console.log("add")
    /*const user = req.body;
    console.log(user);
    users.push({...user, id: uuidv4(), chief:"Non", reserve:""});

    res.send(`User with the username ${user.firstName} added to the database!`);*/
    const user = req.body;
    console.log(user)
    db.query("INSERT INTO Users(id, firstName, lastName, chief, adress, email, phoneNumber, passwordP, passwordVerif, reserve) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [uuidv4(), user.firstName, user.lastName, "Non", user.adress, user.email, user.phoneNumber, user.password, user.passwordVerif, "none"]);
    
};

export const getUser = (req, res)=>{
    const {email} = req.params;
    db.query(`SELECT * FROM users WHERE email = '${email}'`, [], (error, resultat)=>{
        if(error){
            console.log(error);
        }else {
            console.log("res",resultat[0]);
            res.send(resultat);
            
        }
    });
};

export const deleteUser = (req, res) => {
    const {email} = req.params;

    users = users.filter((user)=> user.email != email);

    res.send(`User with the id ${id} deleted from the database`)

};

export const patchUser = (req, res) => {
    console.log(req.params['email']);
    const {phoneNumber, email, password, newPassword, reserve} = req.body;
    const Id = req.params['email']
    
    if(phoneNumber)  db.query(`UPDATE users SET phoneNumber = '${phoneNumber}' WHERE email = '${Id}'`);
    if(email) db.query(`UPDATE users SET email = '${email}' WHERE email = '${Id}'`);;
    if(password) {
        db.query(`UPDATE users SET passwordP = '${password}' WHERE email = '${Id}'`);
        db.query(`UPDATE users SET passwordVerif = '${password}' WHERE email = '${Id}'`);
    }
    if(reserve) db.query(`UPDATE users SET reserve = '${reserve}' WHERE email = '${Id}'`);

    res.send(`User with the id ${Id} has been updated`)

};



