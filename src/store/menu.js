const state = {
  isCollapse: false,
  selectMenu: []
}

const mutations = {
  collapseMenu(state) {
    state.isCollapse = !state.isCollapse
  },
  addMenu(state, payload) {
    const set = new Set(state.selectMenu)
    set.add(payload)
    state.selectMenu = [...set]
  },
  closeMenu(state, item) {
    const index = state.selectMenu.findIndex(val => val.name === item.name)
    state.selectMenu.splice(index, 1)
  },
  dynamicMenu() {
    const modules= import.meta.glob(['../views/**/**/*.vue'])
    console.log(modules, 'payload')
  }
}

export default {
  state,
  mutations
}