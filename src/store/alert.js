export default {
    namespaced : true,
    state : {
        text : ''
    },
    mutations : {
        setText: (state, payload) => {
            state.text = payload
        }
    },
    actions: {
        setText : ({commit}, payload) => {
            commit('setText', payload)
        }
    },
    getters : {
        text : state => state.text
    }
}