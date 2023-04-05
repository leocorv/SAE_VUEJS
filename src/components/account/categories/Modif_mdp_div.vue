<template>
    <div class="flex-col mt-2 mr-10">
        <h2 class=" text-xl font-bold">Modifier mot de passe</h2>
        <div class="flex flex-col items-start mt-3">
            <label for="prenom">Ancien mot de passe :</label>
            <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-base p-1" type="password" id="oldpasswword" v-model="oldpassword" :readonly="!editing" />
        </div>
        <div class="flex flex-col items-start mt-3">
            <label for="prenom">Nouveau mot de passe :</label>
            <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-base p-1" type="password" id="newpassword" v-model="password" :readonly="!editing" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            oldpassword: "",
            newpassword: "",

            messageError: "",
        }
    },
    methods: {
        async toggleEditing() {
        this.messageError = '';
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
                    this.oldpassword = "";
                    this.newpassword = "";
                    this.$forceUpdate(); // Force VueJS à mettre à jour le DOM

                    const errorMsg = error.response.data;

                if (typeof errorMsg === 'string' && errorMsg.includes("IX_t_e_client_clt_clt_email")) {
                this.messageError = "Le mot de passe est incorrecte.";
                }
            }
            }
        }
    },
    }
}
</script>

<style>

</style>