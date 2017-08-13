import db from './../../db';

const state = {
    investments: [],
    isLoading: false,
    dbRef: null
}


const getters = {
    investments: state => state.investments
}


const actions = {
    loadInvestments({ commit, state }, user) {

        commit('setDbRef', db.ref('users/' + user.uid + '/investments'));

        state.dbRef.on('value', function (snapshot) {

            commit('setInvestments', {
                investments: _.map(snapshot.val(), function (item) {
                    return item;
                })
            });

        });
    },
    addInvestment({ commit, state }, investment) {

        state.dbRef.push(investment);

    }
}

const mutations = {
    setDbRef(state, ref) {
        state.dbRef = ref;
    },
    startLoading(state) {
        state.isLoading = true;
    },
    setInvestments(state, { investments }) {
        state.isLoading = false;
        state.investments = investments;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}