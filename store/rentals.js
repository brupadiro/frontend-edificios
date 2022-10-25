import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

export const state = () => ({
  rental: {
    warranty_type: '',
    start_date: '',
    end_date: '',
    user: null,
  },
  user: {
    name: '',
    doc: '',
    username: '',
    type: 'tenant',
  },
  tenants: {
    data: [],
    meta: {}
  }
})


export const getters = {
  getAll(
    state
  ) {
    return state.tenants

  },
  user(state) {
    return state.user
  },
  get(state) {
    return state.rental
  },
  getField
}

export const actions = {
  async findAll({
    commit
  }, params = {}) {
    if (params.filters) {
      params.filters.apartment = {
        building: this.$auth.user.building.id
      }
    } else {
      params.filters = {
        apartment: {
          building: this.$auth.user.building.id
        }
      }
    }


    const {
      data: data
    } = await this.$axios.get('/rentals', {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('setList', data)
  },
  async find({
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/rentals/?populate=user`, {
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })


    if (data.meta.pagination.total > 0) {
      if (data.data[0].attributes.user.data == null) {
        data.data[0].attributes.user.data = {}
      }
      commit('set', {
        ...data.data[0].attributes,
        id: data.data[0].id
      })
      return data.data[0].attributes

    } else {
      return {
        user: {
          data: {}
        }
      }
    }
  },
  async create({
    dispatch,
    state,
    rootGetters,
    commit
  }, user) {
    const {
      data: data
    } = await this.$axios.post('/rentals', {
      data: state.rental
    })
    return data


  },
  async update({
    state,
    commit
  }) {
    const {
      data: data
    } = await this.$axios.put(`/rentals/${state.rental.id}`, {
      data: state.rental
    })
    commit('set', {
      ...data.data.attributes,
      id: data.data.id
    })
  },
  async delete(id) {
    await this.$axios.delete(`/rentals/${id}`)
  },

  setUser({
    commit
  }, user) {
    commit('setUser', user)
  },

  clear({
    commit
  }) {
    commit('set', {
      warranty_type: '',
      start_date: '',
      end_date: '',
    })
  },
  set({
    commit
  }, data) {
    commit('set', data)
  },

}
export const mutations = {
  updateField,
  set(state, data) {
    state.rental = {
      ...state.rental,
      ...data
    }
  },
  setUser(state, data) {
    state.user = {
      ...state.user,
      ...data
    }
  },
  setList(state, data) {
    state.tenants = data
  }
}
