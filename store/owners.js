import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

export const state = () => ({
  owner: {
    doc: '',
    name: '',
    in_property: false
  },
  owners: []
})


export const getters = {
  getField,
  get(state) {
    return state.owner
  }
}

export const actions = {
  async findAll({
    state,
    commit
  }, params = {}) {
    const {
      data: data
    } = await this.$axios.get('/owners', {
      params: params
    })
    commit('set', data)
  },
  async find({
    state,
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/owners/`,{
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
    state,
    commit,
    dispatch,
    getters,
    rootGetters
  }) {
    const apartment = rootGetters['apartments/get']
    await this.$axios.post('/owners', {
      data: {
        ...state.owner,
        apartment: apartment.id
      }
    })

    if (state.owner.in_property) {
      dispatch('habitants/set', {
        name: state.owner.name,
        doc: state.owner.doc,
        apartment: apartment,
        type: 'owner'
      }, {
        root: true
      })
      await dispatch('habitants/create', null, {
        root: true
      })
    }
  },
  async update({
    state,
    commit
  }, id) {
    const {
      data: data
    } = await this.$axios.put(`/owners/${state.owner.id}`, {data:state.owner})
    
    if (state.owner.in_property) {
      dispatch('habitants/set', {
        name: state.owner.name,
        doc: state.owner.doc,
        apartment: apartment,
        type: 'owner'
      }, {
        root: true
      })
      await dispatch('habitants/create', null, {
        root: true
      })
    }
    commit('set',  {...data.data.attributes, id: data.data.id})
  },
  async delete(id) {
    await this.$axios.delete(`/owners/${id}`)
  },
  clear({
    commit
  }) {
    commit('set', {
      doc: '',
      name: '',
      in_property: false

    })
  }
}
export const mutations = {
  updateField,
  set(state, data) {
    state.owner = data
  }
}
