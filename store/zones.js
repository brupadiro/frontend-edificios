import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');
export const state = {
  zones: {},
  areaReservations: {},
  zone: {
    name:'',
    capacity:1
  }
}


export const getters = {
  getField,
  getList(state) {
    return state.zones
  },
  getReservationList(state) {
    return state.areaReservations
  },
  get(state) {
    return state.zone
  }
}

export const actions = {
  async find({
    commit
  }) {
    const {
      data: data
    } = await this.$axios.get(`/zones`, {
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('set', data.data[0].attributes)
  },
  async findAll({
    commit
  },params) {
    const {
      data: data
    } = await this.$axios.get('/zones', {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('setList', data)
  },
  async findAllReservations({
    commit
  },params) {
    const {
      data: data
    } = await this.$axios.get('/area-reservations', {
      params: {
        ...params,
        populate: '*'
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('setAreaList', data)
  },
  async add({
    commit,
    state
  }) {
    const {
      data: data
    } = await this.$axios.post(`/zones`, {data:state.zone})
    commit('set', {
      ...data.data.attributes,
      id: data.data.id
    })
  },
  async addReservation({
    commit,
    state
  },params) {
    const {
      data: data
    } = await this.$axios.post(`/area-reservations`, {data:params})
    commit('setSingleReservation', data.data)
  },
  async delete({
    commit,
    state
  }, id) {
    await this.$axios.delete(`/zones/${state.zone.id}`)
    setTimeout(() => {
      commit('delete', id)
    }, 3000);
  },
  clear({
    commit
  }) {
    commit('set', {})
  }
}

export const mutations = {
  updateField,
  set(state, zone) {
    state.zone = zone
  },
  setSingleReservation(state, reservation) {
    state.areaReservations.data.push(reservation)
  },
  setAreaList(state, areaList) {
    state.areaReservations = areaList
  },
  setList(state, data) {
    state.zones = data
  }
}
