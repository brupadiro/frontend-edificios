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
  },
  tenants: []
})


export const getters = {
  getField
}

export const actions = {
  async findAll({
    commit
  }, params = {}) {
    const {
      data: data
    } = await this.$axios.get('/rentals', {
      params: params
    })
    commit('setList', data)
  },
  async find({commit},query) {
    const {
      data: data
    } = await this.$axios.get(`/rentals/`,{
      params:{
        filters:query
      },
      paramsSerializer: params => {
        return qs.stringify(params,{arrayFormat: 'brackets'})
      }
    })
    commit('set',  {...data.data[0].attributes, id: data.data[0].id})
  },
  async create({
    dispatch,
    state,
    rootGetters,
    commit
  }) {
    await this.$axios.post('/rentals', {
      data: state.rental
    })

    const apartment = rootGetters['apartments/get']
    dispatch('habitants/set', {
      apartment: apartment,
      type: 'owner'
    }, {
      root: true
    })
    await dispatch('habitants/create', null, {
      root: true
    })

  },
  async update({state, commit}) {
    const {
      data: data
    } = await this.$axios.put(`/rentals/${state.rental.id}`, {data:state.rental})
    commit('set',  {...data.data.attributes, id: data.data.id})
  },
  async delete(id) {
    await this.$axios.delete(`/rentals/${id}`)
  },
  clear({
    commit
  }) {
    commit('set', {
      warranty_type: '',
      start_date: '',
      end_date: '',
    })
  }
}
export const mutations = {
  updateField,
  set(state, data) {
    state.rental = data
  },
  setList(state, data) {
    console.log(data)
    state.tenants = data
  }
}
