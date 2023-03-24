/* Import des modules nécessaires */
import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://localhost:7140'
})

export default Axios