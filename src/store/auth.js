import axios from 'axios'

export default {
    namespaced : true,
    state : {
        token : '',
        user : {},
        guest : true
    },
    mutations : {
        setToken: (state, payload) => {
            state.token = payload
        },
        setUser : (state, payload) => {
            state.user = payload
        },
        setGuest : (state, payload) => {
            state.guest = payload
        }
    },
    actions: {
        setToken : ({commit, dispatch}, payload) => {
            commit('setToken', payload)
            dispatch('checkToken', payload)
        },
        checkToken : ({commit}, payload) => {
            let config = {
                method : 'post',
                url : 'https://demo-api-vue.sanbercloud.com/api/v2/auth/me',
                headers : {
                    'Authorization' : 'Bearer ' + payload
                }
            }
            axios(config)
                .then((response) => {
                    commit('setUser', response.data)
                    commit('setGuest', false)
                })
                .catch(() => {
                    commit('setUser', {})
                    commit('setToken', '')
                    commit('setGuest', true)
                })
        },
        setUser : ({commit}, payload) => {
            commit('setUser', payload)
        },
        setGuest : ({commit}, payload) => {
            commit('setGuest', payload)
        }
    },
    getters : {
        user : state => state.user,
        token : state => state.token,
        guest : state => state.guest
    }
}