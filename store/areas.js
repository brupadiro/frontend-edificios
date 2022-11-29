var qs = require('qs');
export const state = {
  areasList: {},
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

    if (params.filters) {
      params.filters.building = this.$auth.user.building.id
    } else {
      params.filters = {
        building: this.$auth.user.building.id
      }
    }

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
    var buldingId = this.$auth.user.building.id
    const {
      data: data
    } = await this.$axios.post(`/areas`, {
      data: {
        ...amenity,
        building: buldingId
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
    state.areasList.data.unshift({
      name: 'Seleccione una opcion',
      id:0
    })
  },
  delete(state, id) {
    state.areasList.data = state.areasList.data.filter((amenity) => amenity.id !== id)
  },
  set(state, data) {
    state.areasList.data.push(data.data)
  }

}
