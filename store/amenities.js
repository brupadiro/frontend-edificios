var qs = require('qs');
export const state = {
  amenities: [],
}


export const getters = {
  getList(state) {
    return state.amenities
  }
}

export const actions = {
  async find({
    commit
  }) {



    const {
      data: data
    } = await this.$axios.get(`/amenities`, {
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('set', data)
  },
  async add({
    commit
  }, amenity) {
    const {
      data: data
    } = await this.$axios.post(`/amenities`, {
      data: {
        ...amenity,
      }
    })
    commit('setSingle', data)
  },
  async delete({
    commit
  }, id) {
    await this.$axios.delete(`/amenities/${id}`)
    setTimeout(() => {
      commit('delete', id)
    }, 3000);
  }

}

export const mutations = {
  set(state, amenities) {
    state.amenities = amenities
  },
  delete(state, id) {
    state.amenities.data = state.amenities.data.filter((amenity) => amenity.id !== id)
  },
  setSingle(state, amenity) {
    state.amenities.data.push(amenity.data)
  }

}
