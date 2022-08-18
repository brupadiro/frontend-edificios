import { getField, updateField } from 'vuex-map-fields';
var qs = require('qs');

export const getters = {
  getField,
}
export const actions = {
  set({commit},data){
    commit('set',data)
  },
  async create({state},data) {
    var {data:data} = await this.$axios.post('/users', {
      data: data
    })
    return data
  },
}
export const mutations = {
  updateField,
}