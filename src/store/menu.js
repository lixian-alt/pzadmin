const state = localStorage.getItem('vuex').menu || {
  isCollapse: false,
  selectMenu: [],
  routerList: []
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
  dynamicMenu(state, payload) {
    const modules= import.meta.glob('../views/**/**/*.vue')
    function routerSet(router) {
      router.forEach(route => {
        if (route.component) {
          const url = `../views${route.meta.path}/index.vue`;
          route.component = modules[url]
        } else if (route.children){
          routerSet(route.children)
        }
      })
    }
    routerSet(payload)
    state.routerList = payload
  }
}

export default {
  state,
  mutations
}