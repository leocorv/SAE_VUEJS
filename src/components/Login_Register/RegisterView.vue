<template>
<div id="register" class="text-center flex flex-col items-center mb-8">
    <h1 class="text-5xl font-semibold mb-8">Inscription</h1>
    <div class="block justify-around text-center w-full max-w-md">
        <div class=" px-10 py-4 m-4 text-center items-center border-gray-500/10 border-2 border-solid rounded-3xl shadow-lg">
            <!-- <h2 class="text-3xl font-semibold">Par adresse mail</h2> -->
            <form @submit.prevent="register">
                <div class="pt-4">
                    <label for="civilite">Civilité:</label>
                    <select class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="civilite" name="civilite" ref="civilite" required autofocus>
                        <option value="HOMME">Homme</option>
                        <option value="FEMME">Femme</option>
                    </select>
                </div>
                <div class="pt-4">
                    <label>Nom *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="lname" type="text" name="lname" ref="lname" required autofocus>
                    </div>
                </div>
                <div class="pt-4">
                    <label>Prénom *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="fname" type="text" name="fname" ref="fname" required autofocus>
                    </div>
                </div>
                <div class="pt-4">
                    <label>Téléphone *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="telephone" type="text" name="telephone" ref="telephone" required autofocus>
                    </div>
                </div>
                <div class="pt-4">
                    <label>E-mail *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="email" type="email" name="email" ref="email"  required autocomplete="email" autofocus pattern="^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$" title="Doit être de ce format : mail@domaine.code">
                    </div>
                    <span class="text-red-600 whitespace-nowrap max-w-[10rem]">{{ emailError }}</span>
                </div>
                <div class="pt-4">
                    <label>Mot de passe *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="password_register" type="password" name="password" ref="password_register" required title="Doit contenir au minimum un chiffre, une minuscule, une majuscule et faire minimum 8 caractères" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
                    </div>
                </div>
                <div class="pt-4">
                    <label>Confirmer le mot de passe *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="password_second" type="password" name="password" ref="password_second" required title="Doit contenir au minimum un chiffre, une minuscule, une majuscule et faire minimum 8 caractères" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}">
                    </div>
                </div>
                <span class="text-red-600 whitespace-nowrap max-w-[10rem]">{{ errorPwd }}</span>
                <div class="pt-4 flex items-center">
                    <span>Recevoir les offres de Miliboo:</span>
                    <label class="relative inline-flex items-center cursor-pointer ml-2">
                        <input type="checkbox" class="sr-only peer"  id="newsMiliboo" ref="newsMiliboo">
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>
                <div class="pt-4 flex items-center">
                    <span>Recevoir les offres de nos partenaires:</span>
                    <label class="relative inline-flex items-center cursor-pointer ml-2">
                        <input type="checkbox" class="sr-only peer"  id="newsPartenaire" ref="newsPartenaire">
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>

                <div>
                    <button class=" rounded-full btn2 mt-6 px-10 py-4 relative border border-gray-500 uppercase font-bold tracking-wider leading-none overflow-hidden text-gray-900" type="submit" @submit.prevent="register">
                      <span class=" absolute inset-0 bg-gray-200 "></span>
                      <span class=" rounded-full absolute inset-0 flex justify-center items-center font-bold"> 
                        Créer un compte
                      </span>
                      Créer un compte
                  </button>
                </div>
            </form>
        </div>
    </div>
</div>

</template>


<script>
import { useAuthStore } from '../../store.js';
import { accountService } from '@/_services';
import crypto from '../../_services/cryptage.js';
import router from '../../router/index.js'

export default {
    data() {
        return {
            errorPwd: '',
            emailError: '',
        };
    },
    methods: {
        encrypt(password) {
            const encryptedPassword = crypto.encrypt(password.toString(), import.meta.env.VITE_CRYPTO_KEY, import.meta.env.VITE_IV_FIXE);
            return encryptedPassword;
        },
        async register() {
            const dateCreation = new Date().toISOString();
            const civilite = this.$refs.civilite.value;
            const lname = this.$refs.lname.value;
            const fname = this.$refs.fname.value;
            const telephone = this.$refs.telephone.value;
            const email = this.$refs.email.value;
            const password = this.$refs.password_register.value;
            const password_second = this.$refs.password_second.value;
            const newsMiliboo = this.$refs.newsMiliboo.checked;
            const newsPartenaire = this.$refs.newsPartenaire.checked;

            if (password !== password_second) {
                this.errorPwd = 'Les mots de passe ne correspondent pas.';
                return;
            }

            // Chiffrement du mot de passe
            const encryptedPassword = this.encrypt(password);

            const user = {
                civilite: civilite,
                nom: lname,
                prenom: fname,
                portable: telephone,
                mail: email,
                password: encryptedPassword,
                newsMiliboo: newsMiliboo,
                newsPartenaire: newsPartenaire,
                soldeFidelite: 0,
                derniereConnexion: dateCreation,
                dateCreation: dateCreation,
                civilite: civilite,
                carteBancaireClientNavigation: [],
                clientsLivraisonsNavigation: [],
                listesNavigation: [],
                avisClientsNavigation: [],
                commandesClientNavigation: [],
                lignesPanierClientNavigation: []
            };

            console.log(user);
            try {
                const response = await accountService.postClient(user);

                // var uncryptPassword = crypto.decrypt(user.password, import.meta.env.VITE_CRYPTO_KEY, import.meta.env.VITE_IV_FIXE);
                var userLogin = {
                    Mail: user.mail,
                    Password: user.password,
                };
                console.log(userLogin);
                const res = await accountService.login(userLogin);
                console.log(res.data.token.result);
                await accountService.saveToken(res.data.token.result);

                console.log(useAuthStore().isConnected);
                useAuthStore().isConnected = true;
                console.log(useAuthStore().isConnected);

                var emailToken = accountService.getEmailFromToken()
                console.log(emailToken)
                await accountService.getUserByEmail(emailToken)

                await router.push('/myaccount');
                await location.reload()
                // Traite la réponse
                // alert('Inscription réussie !');
                console.log(response);
            } catch (error) {
                // Gére l'erreur
                alert('Erreur lors de l\'inscription : ' + error.message);
                console.log(error);
                if (typeof errorMsg === 'string' && errorMsg.includes("IX_t_e_client_clt_clt_email")) {
                    this.emailError = "L'adresse e-mail est déjà existante ou incorrecte.";
                }
            }
        },
    },
};
</script>

<style>
.btn2 span:first-child{
  transform: translateX(-101%);
  transition: transform .3s ease-in
}
.btn2:hover span{
  transform: translateX(0)
}
</style>
