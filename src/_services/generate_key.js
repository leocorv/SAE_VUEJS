//PAS TOUCHER NIS EXECUTER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const fs = require('fs');
const crypto = require('crypto');

const generateFixedIV = () => {
  const iv = crypto.randomBytes(16);
  return iv.toString('hex');
};

const fixedIV = generateFixedIV();
console.log('IV fixe:', fixedIV);

// Génère une clé de 256 bits (32 octets)
const key = crypto.randomBytes(32).toString('hex');
console.log(`Clé de cryptage : ${key}`);

// Écris la clé et l'IV dans le fichier .env
// fs.writeFileSync('.env', `VUE_APP_CRYPTO_KEY=${key}\nVUE_APP_FIXED_IV=${fixedIV}\n`);
