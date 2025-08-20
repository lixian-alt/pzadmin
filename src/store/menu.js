const state = {
    isCollapse: false,// 菜单是否折叠
    selectMenu: []

}
const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state, payload) {
        //对数据进行去重
        const index = state.selectMenu.findIndex(item => item.path === payload.path)
        if (index === -1) {
            state.selectMenu.push(payload)
        }
    },
    closeMenu(state, payload) {
        //找到点击数据的索引
        const index = state.selectMenu.findIndex(val => val.name === payload.name);
        //通过索引删除指定元素
        state.selectMenu.splice(index, 1);
    }
}

export default {
    state,
    mutations
}