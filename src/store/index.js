import { createStore } from "vuex";
import menu from './menu';
import createpersistedstate from 'vuex-persistedstate';
import { keysOf } from "element-plus/es/utils/objects.mjs";

export default createStore({
    modules: {
        menu
    },
    plugins: [new createpersistedstate({
        key: 'pz_v3pz'
    }
    )]
})