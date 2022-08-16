import { getField, updateField } from 'vuex-map-fields';
var qs = require('qs');

export const state = () => ({
  apartments: {
    data: [],
    meta:{
      pagination:{}
    }
  },
  apartment: {
    number: 0,
    rooms: 0,
    bathrooms: 0,
    square_meters: 0,
    payment_method: 0,
    amenities: [],
    expenses_payment_method: 'Card',
    expenses_cost: 0,
    in_rent: false,
  },
})

export const getters = {
  getField,
  getList(state) {
    return state.apartments
  },
  get(state) {
    return state.apartment
  }
}


export const actions = {
  async findAll({
    state,
    commit
  }, params = {}) {
    const {
      data: data
    } = await this.$axios.get('/apartaments', {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params,{arrayFormat: 'brackets'})
      }
    })
    commit('setList', data)
  },
  async find({
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/apartaments/`,{
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
    commit
  }) {
    const {
      data: data
    } = await this.$axios.post('/apartaments', {data:state.apartment})
    commit('set', {...data.data.attributes, id: data.data.id})
  },
  async update({
    commit,
    state
  }) {
    const {
      data: data
    } = await this.$axios.put(`/apartaments/${state.apartment.id}`,  {data:state.apartment})
    commit('set',  {...data.data.attributes, id: data.data.id})
  },
  async delete({
    dispatch,
    state
  }, id) {
    await this.$axios.delete(`/apartaments/${id}`)
    dispatch('findAll')
  },
  clear({commit}){
    commit('set',{
      number: 0,
      rooms: 0,
      bathrooms: 0,
      square_meters: 0,
      payment_method: 0,
      amenities: [],
      expenses_payment_method: 'Card',
      expenses_cost: 0,
      in_rent: false,
    })
  }


}
export const mutations = {
  updateField,
  set(state, apartment) {
    state.apartment = apartment
  },
  set(state,data) {
    state.apartment = data
  },
  setList(state, data) {
    state.apartments = data
  }
}
