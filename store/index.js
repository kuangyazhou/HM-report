import axios from 'axios'
export const state = {
    authUser: null,
    storeCode: null,
    isLoading: false,
    qStories: [],
    qEmployees: [],
    forbid: false
}

export const mutations = {
    SET_USER: function(state, user) {
        state.authUser = user
    },
    SET_STORE_CODE: function(state, storecode) {
        state.storeCode = storecode;
        // console.log(state.storeCode);
    },
    SET_IS_LOADING: function(state, status) {
        state.isLoading = status
    },
    SET_QUERY_WORDS: function(state, status) {
        state.qStories = status[0]
        state.qEmployees = status[1]
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.session && req.session.authUser) {
            commit('SET_USER', req.session.authUser)
        }
        if (req.session && req.session.storeCode) {
            commit('SET_STORE_CODE', req.session.storeCode)
        }
    },
    jump({ commit }, storecode) {
        commit('SET_STORE_CODE', storecode);
        // commit('SET_USER', account);
        console.log(storecode, state)
    },
    login({ commit }, { username, password }) {
        return axios.post('/api/login', {
                username,
                password
            })
            .then((res) => {
                commit('SET_USER', res.data)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    throw new Error('用户名或密码错误')
                }
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    comLogin({ commit }, { account, password }) {
        return axios.post('http://192.168.188.128:8090/hemiao-crm-backservice/data/login.htm', {
                account,
                password
            }).then((res) => {
                const data = res.data.loginUser;
                // console.log(res);
                commit('SET_STORE_CODE', data.storeCode);
                commit('SET_USER', data.account);
            })
            .catch((error) => {
                if (error.code === -100) {
                    throw new Error('用户名或密码错误')
                }
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },

    logout({ commit }) {
        return axios.post('/api/logout')
            .then(() => {
                commit('SET_USER', null)
            })
    },
    dispatchLoadingStatus({ commit }, status) {
        commit('SET_IS_LOADING', status)
    }
}