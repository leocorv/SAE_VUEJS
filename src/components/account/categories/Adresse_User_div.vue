<template>
  <div class="flex-col mt-2 ml-10 mr-10">
      <h2 class="text-xl font-bold">Adresse</h2>
    
      <div v-if="!hasAddress" class="mt-3 text-red-500">
        Aucune adresse enregistrée. Veuillez en ajouter une.
      </div>

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
    
      <button
        class="rounded-full btn2 mt-6 px-10 py-4 relative border border-gray-500 uppercase font-bold tracking-wider leading-none overflow-hidden text-gray-900"
        type="submit"
        @click="toggleEditing"
      >
        <span class="absolute inset-0 bg-gray-200"></span>
        <span
          class="rounded-full absolute inset-0 flex justify-center items-center font-bold"
        >
          {{ editing ? "Enregistrer" : "Modifier" }}
        </span>
        {{ editing ? "Enregistrer" : "Modifier" }}
    </button>
  </div>
</template>


<script>
import { accountService } from "@/_services";

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
      editing: false,
      hasAddress: false,
    };
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const clientId = user.clientId;
    // console.log(clientId);

    try {
      const address = await accountService.getAdresseByClientId(clientId);
      // console.log(address);
      if (address) {
        this.rue = address.rue;
        this.numero = address.numero;
        this.cp = address.cp;
        this.ville = address.ville;
        this.pays = address.pays;
        this.telFixe = address.telFixe;
        this.remarque = address.remarque;
        this.hasAddress = true;
        localStorage.setItem("address", JSON.stringify(address));
        this.$forceUpdate();
      } else {
        localStorage.setItem("address", null);
        this.hasAddress = false;
      }
    } catch (error) {
      console.error("Error address:", error);
    }
  },
  methods: {
  async toggleEditing() {
    this.editing = !this.editing;
    if (!this.editing) {
      const address = JSON.parse(localStorage.getItem("address"));
      const user = JSON.parse(localStorage.getItem("user"));

      const updatedData = {
        rue: this.rue,
        numero: this.numero,
        cp: this.cp,
        ville: this.ville,
        pays: this.pays,
        telFixe: this.telFixe,
        remarque: this.remarque
      };

      if (this.hasAddress) {
        localStorage.setItem("address", JSON.stringify(updatedAddress));

        try {
          await accountService.putAdresseById(address.adresseId, updatedAddress);
          this.$forceUpdate();
        } catch (error) {
          console.error("Error updating address:", error.response);
        }
      } else {
        try {
          const newAddress = await accountService.postAdresseWithClient(user.clientId,updatedData);

          this.hasAddress = true;

          localStorage.setItem("address", JSON.stringify(newAddress));

        } catch (error) {
          console.error("Error creating new address:", error.response);
          this.hasAddress = true;
          await location.reload()
        }
      }
    }
  },
},
};
</script>

<style>

</style>