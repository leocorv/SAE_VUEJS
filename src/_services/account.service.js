/* IMPORT DES MODULES NECCESSAIRES */
import Axios from './caller.service';
import jwt_decode from 'jwt-decode';

let login = (credentials) => {
    return Axios.post('/api/login', credentials)
}

let logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

let getEmailFromToken = () => {
    let token = localStorage.getItem('token');
    if (token) {
      let decodedToken = jwt_decode(token);
      return decodedToken.sub;
    }
    return null;
};

let getUserByEmail = (email) => {
    var emailConvert = email.replace(/@/g, "%40");
    var user = []
    var lien = '/api/Clients/GetByEmail?email='+ emailConvert
    Axios.get(lien).then((response)=> {
        user.push(response.data);
        localStorage.setItem('user', JSON.stringify(user[0]));      
    });    
}


export const accountService = {
    login,
    logout,
    saveToken,
    isLogged,
    getUserByEmail,
    getEmailFromToken
}