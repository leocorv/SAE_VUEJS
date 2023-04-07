<template>
<div>
    <div v-if="!hasCommandes" class="flex items-center justify-center">
        <p class="italic">Vous avez aucune commande.</p>
    </div>
    <div v-else>
    <div
        v-for="commande in commandes"
        :key="commande.commandeId"
        class="bg-white p-4 rounded-md shadow-md mb-4"
    >
        <h3 class="text-lg font-bold mb-2">
        Commande #{{ commande.commandeId }}
        </h3>
        <p>État de la commande: {{ commande.etatId }}</p>
    </div>
    </div>
</div>
</template>

<script>
import { accountService } from "@/_services";

export default {
data() {
    return {
    hasCommandes: false,
    commandes: [],
    };
},
async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const clientId = user.clientId;

    try {
        const commandesList = await accountService.getCommandesByIdClient(clientId);
        if (commandesList.length > 0) {
            this.commandes = commandesList;
            this.hasCommandes = true;
            localStorage.setItem("commandes", JSON.stringify(commandesList));
        } else {
            localStorage.setItem("commandes", null);
            this.hasCommandes = false;
        }
        } catch (error) {
        console.error("Error getting commandes:", error);
    }
},
};
</script>

<style>
</style>
  