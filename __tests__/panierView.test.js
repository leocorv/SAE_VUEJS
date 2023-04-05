import { expect, describe, it, vi } from "vitest";
import PanierView from '../src/views/PanierView.vue';
import {mount} from "@vue/test-utils";
import axios from 'axios';

const mockLists = {
    data:[
        {id: 1},
        {id: 2}
    ]
}

vi.spyOn(axios, 'get').mockResolvedValue(mockLists)

describe('API', () => {
    it('retourne le panier', async () => {
         const wrapper = mount(PanierView)
         

         expect(axios.get).toHaveBeenCalledOnce()
         
        //  console.log(wrapper.text())
        expect(wrapper.text()).toContain('Mon panier')
        expect(wrapper.text()).toContain('Chargement ...')
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

