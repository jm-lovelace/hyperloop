import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loops: [],
    openItems: [],
    showNavbar: false,
    loginLock: false,
    userid: null,
    userData: null,
    loopsUnsubscribe: null,
    loopsLoading: false
  },
  mutations: {
    openItem(state, item, above)
    {
      if (above)
      {
        state.openItems.unshift(item);
      }
      else
      {
        state.openItems.push(item);
      }
    },
    closeItem(state, item)
    {
      var index = state.openItems.findIndex(i => i.type === item.type && i.id === item.id);
      if (index > -1)
      {
        state.openItems.splice(index, 1);
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
