import { createStore } from 'vuex'
import menu from './menu'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    plugins: [createPersistedState()],
    modules: {
        menu
    }
})