import panierService from '../src/_services'
import { expect, describe, it } from "vitest";

const {
    service
} = panierService;

describe('getProduitsPanier', () => {
    it('returns a correct result', () => {
        const result = service.getProduitsPanier()
        //vérifier champs
        //vérifier code retour
        expect(result).
    })
})

