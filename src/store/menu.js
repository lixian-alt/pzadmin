const state = {
    isCollapse: false,// 菜单是否折叠
    selectMenu:[]

}
const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    }
}

export default {
    state,
    mutations
}