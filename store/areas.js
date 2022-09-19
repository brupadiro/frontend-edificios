var qs = require('qs');
export const state = {
  areas: [],
}


export const getters = {
  getList(state) {
    return state.areas
  }
}

export const actions = {
  async find({ commit }) {
    const {
      data: data
    } = await this.$axios.get(`/areas`,{
      paramsSerializer: params => {
        return qs.stringify(params,{arrayFormat: 'brackets'})
      }
    })
    commit('set', data)
  },
  async add({commit},amenity) {
    const {
      data: data
    } = await this.$axios.post(`/areas`, amenity)
    commit('setSingle', data)
  },
  async delete({commit},id) {
    await this.$axios.delete(`/areas/${id}`)
    setTimeout(() => {
      commit('delete', id)
    }, 3000);
  }

}

export const mutations = {
  set(state, areas) {
    state.areas = areas
  },
  delete(state, id) {
    state.areas.data = state.areas.data.filter((amenity) => amenity.id !== id)
  },
  setSingle(state, amenity) {
    state.areas.data.push(amenity.data)
  }

}
