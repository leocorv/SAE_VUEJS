<template>
  <div class="flex-col mt-2 ml-5">
    <h2 class=" text-xl font-bold">Informations personnelles</h2>
    <div class="flex flex-col items-start mt-3">
      <label for="civilite">Civilité:</label>
      <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" v-if="!editing" :value=civilite readonly id="civilite">
      <select class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" v-else id="civilite" v-model="civilite">
        <option value="HOMME">Homme</option>
        <option value="FEMME">Femme</option>
      </select>
    </div>
    <div class="flex flex-col items-start mt-3">
      <label for="prenom">Prénom:</label>
      <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-base p-1" type="text" id="prenom" v-model="prenom" :readonly="!editing" />
    </div>
    <div class="flex flex-col items-start mt-3">
      <label for="nom">Nom:</label>
      <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" type="text" id="nom" v-model="nom" :readonly="!editing" />
    </div>
    <div class="flex flex-col items-start mt-3">
      <label for="email">Email:</label>
      <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" type="email" id="mail" v-model="mail" :readonly="!editing" pattern="^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$" title="Doit être de ce format : mail@domaine.code"/>
      <span class="text-red-600 whitespace-nowrap max-w-[10rem]">{{ emailError }}</span>
    </div>
    <div class="flex flex-col items-start mt-3">
      <label for="telephone">Téléphone:</label>
      <input
        class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1"
        type="tel"
        id="portable"
        :value="formatPhoneNumber(portable)"
        @input="portable = $event.target.value.replace(/\s+/g, '')"
        :readonly="!editing"
      />
    </div>
    <div class="form-control flex items-center mt-3">
      <span>Recevoir les offres de Miliboo:</span>
      <label class="relative inline-flex items-center mr-5 cursor-pointer ml-2 mt-1">
        <input type="checkbox" value="" class="sr-only peer"  id="newsMiliboo" :checked="newsMiliboo" :disabled="!editing" v-model="newsMiliboo">
        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      </label>
    </div>
    <div class="form-control flex items-center mt-3">
      <span>Recevoir les offres de nos partenaires:</span>
      <label class="relative inline-flex items-center mr-5 cursor-pointer ml-2 mt-1">
        <input type="checkbox" value="" class="sr-only peer"  id="newsPartenaire" :checked="newsPartenaire" :disabled="!editing" v-model="newsPartenaire">
        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      </label>
    </div>
    <button class=" rounded-full btn2 mt-6 px-10 py-4 relative border border-gray-500 uppercase font-bold tracking-wider leading-none overflow-hidden text-gray-900" type="submit" @click="toggleEditing" >
        <span class=" absolute inset-0 bg-gray-200 "></span>
        <span class=" rounded-full absolute inset-0 flex justify-center items-center font-bold"> 
          {{ editing ? "Enregistrer" : "Modifier" }}
        </span>
        {{ editing ? "Enregistrer" : "Modifier" }}
    </button>
  </div>
</template>

<script>
import { accountService } from '@/_services';

export default {
  data() {
    return {
      //Variable pour modification du user
      originalEmail: "",
      prenom: "",
      nom: "",
      mail: "",
      civilite: "",
      portable: "",
      newsMiliboo: false,
      newsPartenaire: false,
      password: "",
      editing: false,

      //Message si erreur
      emailError: "",
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    this.prenom = user.prenom;
    this.nom = user.nom;
    this.mail = user.mail;
    this.portable = user.portable;
    this.civilite = user.civilite;
    this.newsMiliboo = user.newsMiliboo;
    this.newsPartenaire = user.newsPartenaire;
    this.originalEmail = user.mail;
  },
  methods: {
    buildUserObject(user, updatedData) {
      return {
        clientId: user.clientId,
        mail: updatedData.mail,
        password: user.password,
        nom: updatedData.nom,
        prenom: updatedData.prenom,
        portable: updatedData.portable,
        newsMiliboo: updatedData.newsMiliboo,
        newsPartenaire: updatedData.newsPartenaire,
        soldeFidelite: user.soldeFidelite,
        derniereConnexion: user.derniereConnexion,
        dateCreation: user.dateCreation,
        civilite: updatedData.civilite,
        carteBancaireClientNavigation: user.carteBancaireClientNavigation,
        clientsLivraisonsNavigation: user.clientsLivraisonsNavigation,
        listesNavigation: user.listesNavigation,
        avisClientsNavigation: user.avisClientsNavigation,
        commandesClientNavigation: user.commandesClientNavigation,
        lignesPanierClientNavigation: user.lignesPanierClientNavigation
      };
    },
    async toggleEditing() {
      this.emailError = '';
      this.editing = !this.editing;
      if (!this.editing) {
        const user = JSON.parse(localStorage.getItem("user"));
        const updatedData = {
          prenom: this.prenom,
          nom: this.nom,
          mail: this.mail,
          portable: this.portable,
          civilite: this.civilite,
          newsMiliboo: this.newsMiliboo,
          newsPartenaire: this.newsPartenaire,
        };
        const updatedUser = this.buildUserObject(user, updatedData);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        try {
          await accountService.putClientByEmail(this.originalEmail);
          this.originalEmail = this.mail;
        } catch (error) {
          if (error.response) {
            console.log(error.response);
            // La requête PUT a échoué, recupération des anciennes informations.
            await accountService.getUserByEmail(this.originalEmail);
            const oldUser = JSON.parse(localStorage.getItem("user"));
            this.prenom = oldUser.prenom;
            this.nom = oldUser.nom;
            this.mail = oldUser.mail;
            this.portable = oldUser.portable;
            this.civilite = oldUser.civilite;
            this.newsMiliboo = oldUser.newsMiliboo;
            this.newsPartenaire = oldUser.newsPartenaire;
            this.$forceUpdate(); // Force VueJS à mettre à jour le DOM

            const errorMsg = error.response.data;

            if (typeof errorMsg === 'string' && errorMsg.includes("IX_t_e_client_clt_clt_email")) {
              this.emailError = "L'adresse e-mail est déjà existante ou incorrecte.";
            }
          }
        }
      }
    },
    formatPhoneNumber(phoneNumber) {
      return phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
    },
  },
};
</script>
<style></style>