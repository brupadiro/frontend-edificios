import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');
import moment from 'moment'
export const state = () => ({
  visitsList: {
    data: [],
    meta: {
      pagination: {
        pageCount: 0,
      }
    }
  },
  visit: {
    name: '',
    apartment: 0,
    persons: 1,
    doc_type: 'CI',
    doc: '',
    phone: '',
    in_hour: '',
    in_date: '',
  }
})
export const getters = {
  getField,
  get(state) {
    return state.visit;
  },
  getList(state) {
    return state.visitsList;
  }

}
export const actions = {
  set({
    commit
  }, data) {
    commit('set', data)
  },
  async findAll({
    commit
  }, params) {



    params = params || {
      pagination: {
        page: 1
      },
    };

    const {
      data: data
    } = await this.$axios.get('/visits', {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })

    commit("setList", data)
  },
  async create({
    state,
    dispatch
  }) {
    const in_date = moment(`${state.visit.in_date} ${state.visit.in_hour}`).format('YYYY-MM-DD HH:mm:ss');
    const {
      data: data
    } = await this.$axios.post('/visits', {
      data: {
        ...state.visit,
        in_date: in_date,
        apartment: 1
      }
    })
  },
  async checkout({
    state
  }) {
    let currentHour = moment().format('HH:mm:00.000')
    this.$axios.put(`/visits/${id}`, {
      data: {
        out_hour: currentHour
      }
    })
  },
  clear({
    commit
  }) {
    commit('set', {
      name: '',
      doc: '',
      username: '',
      type: 'owner',
    })
  },

}
export const mutations = {
  updateField,
  set(state, data) {
    state.visit = data
  },
  setList(state, data) {
    console.log(data)
    state.visitsList = data
  }

}
