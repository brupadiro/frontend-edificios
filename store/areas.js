var qs = require('qs');
export const state = {
  areasList: {
    data:[]
  },
}


export const getters = {
  getList(state) {
    return state.areasList
  }
}

export const actions = {
  async findAll({
    commit
  }, params = {}) {

    const {
      data: data
    } = await this.$axios.get(`/areas`, {
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('setList', data)
  },
  async add({
    commit
  }, amenity) {
    const {
      data: data
    } = await this.$axios.post(`/areas`, {
      data: {
        ...amenity,
      }
    })
    commit('set', data)
  },
  async delete({
    commit
  }, id) {
    await this.$axios.delete(`/areas/${id}`)
    setTimeout(() => {
      commit('delete', id)
    }, 3000);
  }

}

export const mutations = {
  setList(state, data) {
    state.areasList = data
  },
  delete(state, id) {
    state.areasList.data = state.areasList.data.filter((amenity) => amenity.id !== id)
  },
  set(state, data) {
    state.areasList.data.push(data.data)
  }

}
