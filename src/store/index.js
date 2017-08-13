import Vue from 'vue'
import Vuex from 'vuex'
import investments from './modules/investments'
import authentication from './modules/authentication'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication,
        investments
    },
})