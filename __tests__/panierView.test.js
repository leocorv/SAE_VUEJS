import { expect, describe, it, vi } from "vitest";
import PanierView from '../src/views/PanierView.vue';
import { flushPromises, mount } from "@vue/test-utils";
import axios from 'axios';

const mockLists = {
    data:[
        {
          "ligneId": 124,
          "clientId": 1,
          "varianteId": 65,
          "quantite": 1,
          "clientLignePanierNavigation": null,
          "variantesLignePanierNavigation": {
            "idVariante": 65,
            "idCouleur": 15,
            "idProduit": 21,
            "prix": 399,
            "promo": 1,
            "stock": 50,
            "dateCreation": null,
            "couleurVarianteNavigation": {
              "idCouleur": 15,
              "libelle": "blanc",
              "codeHexa": "#FFFFFF",
              "variantesCouleurNavigation": null
            },
            "produitVarianteNavigation": {
              "idProduit": 21,
              "categorieId": 15,
              "collectionId": null,
              "libelle": "Fauteuil scandinave en tissu et bois ISKO",
              "description": null,
              "inscructionsEntretien": null,
              "revetement": null,
              "matiere": "Hévéa massif",
              "matierePieds": null,
              "hauteurPieds": 63,
              "typeMousseAssise": null,
              "typeMousseDossier": null,
              "densiteAssise": 25,
              "densiteDossier": null,
              "poidsColis": 17,
              "dimDossier": null,
              "dimAssise": null,
              "dimTotale": null,
              "dimColis": null,
              "dimDeplie": null,
              "dimAccoudoir": null,
              "madeInFrance": false,
              "variantesProduitNavigation": null,
              "categorieProduitNavigation": null,
              "collectionProduitNavigation": null,
              "listeProduitNavigation": []
            },
            "lignePanierVarianteNavigation": null,
            "avisVarianteNavigation": [],
            "photosVarianteNavigation": [
              {
                "photoId": 65,
                "categorieId": null,
                "aviId": null,
                "varianteId": 65,
                "chemin": "https://www.miliboo.com/chaise-longue-fauteuil-design-blanc-taylor-21728-5bb370042cb39_1200_675_.jpg",
                "categoriePhotoNavigation": null,
                "variantePhotoNavigation": null,
                "avisPhotosNavigation": null
              }
            ],
            "lignesCommandeVarianteNavigation": []
    }
  },
  {
    "ligneId": 69,
    "clientId": 2,
    "varianteId": 77,
    "quantite": 9,
    "clientLignePanierNavigation": null,
    "variantesLignePanierNavigation": {
      "idVariante": 77,
      "idCouleur": 16,
      "idProduit": 27,
      "prix": 159,
      "promo": 1,
      "stock": 50,
      "dateCreation": null,
      "couleurVarianteNavigation": {
        "idCouleur": 16,
        "libelle": "noir",
        "codeHexa": "#000000",
        "variantesCouleurNavigation": null
      },
      "produitVarianteNavigation": {
        "idProduit": 27,
        "categorieId": 23,
        "collectionId": null,
        "libelle": "Chaises design empilables intérieur / extérieur (lot de 2) KATIA",
        "description": null,
        "inscructionsEntretien": null,
        "revetement": "polypropylène",
        "matiere": "polypropilène",
        "matierePieds": null,
        "hauteurPieds": null,
        "typeMousseAssise": null,
        "typeMousseDossier": null,
        "densiteAssise": 25,
        "densiteDossier": null,
        "poidsColis": 10.35,
        "dimDossier": null,
        "dimAssise": null,
        "dimTotale": null,
        "dimColis": null,
        "dimDeplie": null,
        "dimAccoudoir": null,
        "madeInFrance": false,
        "variantesProduitNavigation": null,
        "categorieProduitNavigation": null,
        "collectionProduitNavigation": null,
        "listeProduitNavigation": []
      },
      "lignePanierVarianteNavigation": null,
      "avisVarianteNavigation": [],
      "photosVarianteNavigation": [
        {
          "photoId": 77,
          "categorieId": null,
          "aviId": null,
          "varianteId": 77,
          "chemin": "https://www.miliboo.com/chaises-design-empilables-noires-interieur-exterieur-(lot-de-2),-flip-50915-620e619f5eaf8_1200_675_.jpg",
          "categoriePhotoNavigation": null,
          "variantePhotoNavigation": null,
          "avisPhotosNavigation": null
        }
      ],
      "lignesCommandeVarianteNavigation": []
    }
  }
]

}



vi.spyOn(axios, 'get').mockResolvedValue(mockLists)

describe('API', () => {
  it('retourne le panier (teste le composant + le service de panier)', async () => {
    const wrapper = mount(PanierView)
    

        expect(axios.get).toHaveBeenCalledOnce()

        await flushPromises()
        
        const panier =wrapper.findAll('[data-test="ligne"]')
        
        expect(panier).toHaveLength(2)
        expect(panier[0].text()).toContain('Fauteuil scandinave en tissu et bois ISKO')
        expect(panier[1].text()).toContain('Chaises design empilables intérieur / extérieur (lot de 2) KATIA')
    })  
    it('teste le toggleReadonly (pour changer les quantités)', async () => {
        const wrapper = mount(PanierView) //mount
        await flushPromises() //promesse
        const confirmSpy = vi.spyOn(wrapper.vm, 'toggleReadonly') //espion sur la methode toggleReadonly
        
        const panier =wrapper.findAll('[data-test="ligne"]') //lignes panier
        var buttonsOfLine = await panier[0].findAll('button') //boutons de la ligne 1
        
        //ASSERT
        //pour l'instant on est en readonly = true donc on a accès qu'a ces boutons
        expect(panier[0].text()).toContain('Modifier la quantité') //btn 1
        expect(panier[0].text()).toContain('Supprimer')  //btn 2
        expect(wrapper.vm.panier[0].prixReadonly).toEqual(true) //readonly true
        
        //ACT
        buttonsOfLine[0].trigger('click') //click sur 'edit' pour enlever le readonly
        await new Promise(r => setTimeout(r, 20)); //sleep nécessaire car la page doit reload
        
        //ASSERT
        expect(confirmSpy).toHaveBeenCalledOnce() //vérifie qu'on a bien appelé la méthode
        expect(wrapper.vm.panier[0].prixReadonly).toEqual(false) //readonly false
        expect(panier[0].text()).toContain('Valider les changements')  //btn 1
        expect(panier[0].text()).toContain('Annuler les changements')  //btn 2
        
    })  
})
describe('Panier vue component', () => {
    it('monte le composant avec ses props', () => {
        const wrapper = mount(PanierView)
        
        //  console.log(wrapper.text())
        expect(wrapper.text()).toContain('Mon panier')
        expect(wrapper.text()).toContain('Chargement ...')
    })  
})

