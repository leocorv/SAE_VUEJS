/* IMPORT DES MODULES NECCESSAIRES */
import Axios from './caller.service';

let login = (credentials) => {
    return Axios.post('/api/login', credentials)
}

let logout = () => {
    localStorage.removeItem('token')
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const accountService = {
    login,
    logout,
    saveToken,
    isLogged
}