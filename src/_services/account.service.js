/* IMPORT DES MODULES NECCESSAIRES */
import Axios from './caller.service';
import jwt_decode from 'jwt-decode';

let login = (credentials) => {
    return Axios.post('/api/login', credentials)
}

let logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('address')
    localStorage.removeItem('commandes')
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
        // console.log(user[0]);
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

let getClientById = async (id) => {
    var lien = '/api/Clients/GetById?id=' + id;
    try {
        const response = await Axios.get(lien);
        // console.log('getUserIdByEmail response:', response);
        const client = response.data
        return client;
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

let putClientById = async (id, client) => {
    var lien = '/api/Clients/Put/'+id;
    try {
      const response = await Axios.put(lien, client);
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

let putAdresseById = async (id, updatedAddress) => {
    try {
      const response = await Axios.put(`/api/Adresses/PutAdresse/${id}`, updatedAddress);
      return true;
    } catch (error) {
      throw error;
    }
  };
  

let postClient = async (user) => {
    try {
        const response = await Axios.post('/api/Clients/PostClient', user);
        return true;
    } catch (error) {
        throw error;
    }
}

let getAdresseByClientId = async (clientId) => {
    try {
        const response = await Axios.get('/api/Adresses/GetAdresseByIdClient?idClient='+clientId);

        return response.data;
    } catch (error) {
        if (error.response.status === 500) {
            // console.error('');
            return false;
        } else {
            console.error("Une erreur s'est produite lors de la récupération de l'adresse par ID client.", error);
            return false;
        }        
    }
}

let putReplacePassword = async (IDuser, oldpassword, newpassword) => {
    try {
        const response = await Axios.put('/api/Clients/ReplacePassword?oldPassword='+oldpassword+'&newPassword='+newpassword+'&idClient='+IDuser);
        console.log(response);
        if (response.status === 200) {
            return true ;
        } else {
            return false;
        }
    } catch (error){
        throw error;
    }
}

let postAddress = async (address) => {
    try {
      const response = await Axios.post('/api/Adresses/PostAdresse', address);
      return response.data;
    } catch (error) {
      throw error;
    }
}

let postAdresseWithClient = async (idclient, adress) => {
    try{
        const response = await Axios.post('/api/Adresses/PostAdresseWithClient?clientId='+idclient, adress)
        return response.data;
    } catch (error) {
        throw error;
    }
}

let getCommandesByIdClient = async (id) => {
    try {
    const response = await Axios.get('/api/Commandes/GetCommandesByIdClient?clientId=' + id);
    return response.data;
    } catch (error) {
    console.error("Error getting commandes by client id:", error);
    return [];
    }
}

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
    postClient,
    getAdresseByClientId,
    putReplacePassword,
    postAddress,
    getClientById,
    putClientById,
    getCommandesByIdClient,
    postAdresseWithClient,
    
}