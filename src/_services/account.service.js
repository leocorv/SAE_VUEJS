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
    var lien = '/api/Clients/GetByEmail?email='+ emailConvert;
    return Axios.get(lien).then((response)=> {
        user.push(response.data);
        localStorage.setItem('user', JSON.stringify(user[0]));
        console.log(user[0]);
        // localStorage.setItem('adresse', JSON.stringify())
    });    
}


let getUserIdByEmail = async (email) => {
    var emailConvert = email.replace(/@/g, "%40");
    var lien = '/api/Clients/GetByEmail?email=' + emailConvert;
    try {
        const response = await Axios.get(lien);
        // console.log('getUserIdByEmail response:', response);
        const clientId = response.data.clientId;
        return clientId;
    } catch (error) {
        // console.error(error);
        return null;
    }
}

let putClientByEmail = async (email) => {
    var userId = await getUserIdByEmail(email);
    var lien = '/api/Clients/Put/'+userId;
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await Axios.put(lien, user);
      return true;
    } catch(error) {
      throw error;
    }   
}
  
let getAdresseById = async (id) => {
    try {
        const response = await Axios.get('/api/Adresses/GetById/${id}');
        const address = response.data;
        localStorage.setItem("address", JSON.stringify(address));
        return address;
    } catch (error) {
        throw error;
    }
};

let putAdresseById = async (id) => {
    const address = JSON.parse(localStorage.getItem("address"));
    try {
        const response = await Axios.put('/api/Adresses/PutAdresse/${id}', address);
        return true;
    } catch (error) {
        throw error;
    }
};

export const accountService = {
    login,
    logout,
    saveToken,
    isLogged,
    getUserByEmail,
    getEmailFromToken,
    putClientByEmail,
    putAdresseById,
    getAdresseById,
}