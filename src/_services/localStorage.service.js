
//permet de set un item avec une certaine value une date limite dans le localstorage
function setWithExpiry(itemName, value, minutes) {
    const now = new Date()
    const timeInMili=minutes*60*1000

    const item = {
        value: value,
        expiry: now.getTime() + timeInMili,
    }
    localStorage.setItem(itemName, JSON.stringify(item))
}

function get(itemName){
    const itemStr = localStorage.getItem(itemName)
    // Si l'item n'existe pas, on return null
    if (!itemStr) {
        return null
    }
    //sinon on le parse
    const item = JSON.parse(itemStr)
    return item.value
}

//pemet de récupérer un item (s'il existe et s'il n'est pas expiré) dans le local storage
//return null or la value de l'item
function getWithExpiry(itemName) {
    const itemStr = localStorage.getItem(itemName)
    // Si l'item n'existe pas, on return null
    if (!itemStr) {
        return null
    }
    //sinon on le parse
    const item = JSON.parse(itemStr)
    const now = new Date()
    // on compare la date actuelle et la date d'expiration
    if (now.getTime() > item.expiry) {
        // Si l'item est expiré, on le supprime
        localStorage.removeItem(itemName)
        //et on return null
        return null
    }
    //sinon on renvoie l'item
    return item.value
}

export default {
    setWithExpiry,
    getWithExpiry,
    get,
}