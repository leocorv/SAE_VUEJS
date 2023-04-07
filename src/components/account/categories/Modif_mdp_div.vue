<template>
    <div class="flex-col mt-2 mr-5">
        <h2 class=" text-xl font-bold">Modifier votre mot de passe</h2>
        <span class="text-green-600 whitespace-nowrap max-w-[10rem]">{{ messageSuccess }}</span>
        <form>
            <div class="flex flex-col items-start mt-3">
                <label for="prenom">Ancien mot de passe :</label>
                <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-base p-1" type="password" id="oldpasswword" v-model="oldpassword" :readonly="!editing" title="Doit contenir au minimum un chiffre, une minuscule, une majuscule et faire minimum 8 caractères" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
            </div>
            <div class="flex flex-col items-start mt-3">
                <label for="prenom">Nouveau mot de passe :</label>
                <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-base p-1" type="password" id="newpassword" v-model="newpassword" :readonly="!editing"  title="Doit contenir au minimum un chiffre, une minuscule, une majuscule et faire minimum 8 caractères" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                <span class="text-red-600 whitespace-nowrap max-w-[10rem]">{{ messageError }}</span>
            </div>
            <button class=" rounded-full btn2 mt-6 px-10 py-4 relative border border-gray-500 uppercase font-bold tracking-wider leading-none overflow-hidden text-gray-900" type="submit" @click.prevent="toggleEditing">
                <span class=" absolute inset-0 bg-gray-200 "></span>
                <span class=" rounded-full absolute inset-0 flex justify-center items-center font-bold"> 
                {{ editing ? "Enregistrer" : "Modifier" }}
                </span>
                {{ editing ? "Enregistrer" : "Modifier" }}
            </button>
        </form>
    </div>
</template>

<script>
import { accountService } from '@/_services';
import crypto from '../../../_services/cryptage.js';

export default {
    data() {
        return {
            oldpassword: "",
            newpassword: "",
            editing: false,

            messageSuccess: "",
            messageError: "",
        }
    },
    methods: {
        async toggleEditing() {
            this.messageError = '';
            this.messageSuccess = '';
            this.editing = !this.editing;
            if (!this.editing) {
                const user = JSON.parse(localStorage.getItem("user"));
                const idClient = user.clientId;
                // console.log(idClient);

                try {
                    var oldpasswordCrypted = crypto.encrypt(this.oldpassword.toString(), import.meta.env.VITE_CRYPTO_KEY, import.meta.env.VITE_IV_FIXE);
                    var newpasswordCrypted = crypto.encrypt(this.newpassword.toString(), import.meta.env.VITE_CRYPTO_KEY, import.meta.env.VITE_IV_FIXE);
                    if (oldpasswordCrypted == newpasswordCrypted){
                        this.oldpassword = "";
                        this.newpassword = "";
                        this.$forceUpdate(); // Force VueJS à mettre à jour le DOM
                        this.messageError = "Les mots de passe sont identique.";
                    } else {
                        const response = await accountService.putReplacePassword(idClient, oldpasswordCrypted, newpasswordCrypted);
                        // console.log(response);
                        if(response == true){
                            this.messageSuccess = "Votre mot de passe a bien été modifié."
                            user.password = newpasswordCrypted;
                            localStorage.setItem("user", JSON.stringify(user));
                            this.$forceUpdate();
                            this.messageSuccess = "Votre mot de passe a bien été modifié."
                        } else {
                            throw new Error("Error updating password");
                        }
                    }
                } catch (error) {
                    // console.log(error);
                    this.oldpassword = "";
                    this.newpassword = "";
                    this.$forceUpdate(); // Force VueJS à mettre à jour le DOM
                    this.messageError = "L'un des mots de passe n'est pas correcte.";
                }
            }
        },
    }
}
</script>

<style>

</style>
