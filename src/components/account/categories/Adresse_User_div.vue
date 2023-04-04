<template>
<div class="flex-col mt-2 ml-10">
    <h2 class="text-xl font-bold">Adresse</h2>
  
    <div class="flex flex-col items-start mt-3">
      <label for="rue">Rue:</label>
      <input
        class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1"
        type="text"
        id="rue"
        v-model="rue"
        :readonly="!editing"
      />
    </div>
  
    <div class="flex flex-col items-start mt-3">
      <label for="numero">Numéro:</label>
      <input
        class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1"
        type="text"
        id="numero"
        v-model="numero"
        :readonly="!editing"
      />
    </div>
  
    <div class="flex flex-col items-start mt-3">
      <label for="cp">Code postal:</label>
      <input
        class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1"
        type="text"
        id="cp"
        v-model="cp"
        :readonly="!editing"
      />
    </div>
  
    <div class="flex flex-col items-start mt-3">
      <label for="ville">Ville:</label>
      <input
        class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1"
        type="text"
        id="ville"
        v-model="ville"
        :readonly="!editing"
      />
    </div>
  
    <div class="flex flex-col items-start mt-3">
      <label for="pays">Pays:</label>
      <input
        class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1"
        type="text"
        id="pays"
        v-model="pays"
        :readonly="!editing"
      />
    </div>
  
    <div class="flex flex-col items-start mt-3">
      <label for="telFixe">Téléphone fixe:</label>
      <input
        class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1"
        type="tel"
        id="telFixe"
        v-model="telFixe"
        :readonly="!editing"
      />
    </div>
  
    <div class="flex flex-col items-start mt-3">
      <label for="remarque">Remarque:</label>
      <textarea
        class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1"
        id="remarque"
        v-model="remarque"
        :readonly="!editing"
      ></textarea>
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
export default {
  data() {
    return {
      rue: "",
      numero: "",
      cp: "",
      ville: "",
      pays: "",
      telFixe: "",
      remarque: null,
    };
  },
  mounted() {
    const address = JSON.parse(localStorage.getItem("adresse"));
    this.rue = adresse.rue;
    this.numero = adresse.numero;
    this.cp = adresse.cp;
    this.pays = adresse.pays;
    this.telFixe = adresse.telFixe;
    this.remarque = adresse.remarque;
  },
  methods: {
  async toggleEditing() {
      this.editing = !this.editing;
      if (!this.editing) {
        const address = JSON.parse(localStorage.getItem("address"));
        const updatedData = {
          rue: this.rue,
          numero: this.numero,
          cp: this.cp,
          ville: this.ville,
          pays: this.pays,
          telFixe: this.telFixe,
          remarque: this.remarque,
        };
        const updatedAddress = Object.assign({}, address, updatedData);
        localStorage.setItem("address", JSON.stringify(updatedAddress));

        try {
        await accountService.putAddressById(address.adresseId);
        } catch (error) {
          if (error.response) {
              console.log(error.response);
              // La requête PUT a échoué, récupération des anciennes informations.
              await accountService.getAddressById(address.adresseId);
              const oldAddress = JSON.parse(localStorage.getItem("address"));
              this.rue = oldAddress.rue;
              this.numero = oldAddress.numero;
              this.cp = oldAddress.cp;
              this.ville = oldAddress.ville;
              this.pays = oldAddress.pays;
              this.telFixe = oldAddress.telFixe;
              this.remarque = oldAddress.remarque;
              this.$forceUpdate(); // Force VueJS à mettre à jour le DOM
          }
        }
      }
    },
  }
}
</script>
<style>

</style>