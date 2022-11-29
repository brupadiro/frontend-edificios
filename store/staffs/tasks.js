import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

export const state = () => ({
  taskList: {
    data: [],
    meta: {}
  },
  task: {
    date: '2022-01-01',
    description: '',
    staff: null,
    priority: 'Medium',
    apartment: null,
    area: 0
  },
})
export const getters = {
  getField,
  get(state) {
    return state.task;
  },
  getList(state) {
    return state.taskList;
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
  }, query) {
    console.log(query)
    const {
      data: data
    } = await this.$axios.get(`/tasks/`, {
      params: {
        populate: 'staff,apartament,area',
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit("setList", data)
  },

  async findAreas({
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/areas/`, {
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit("setAreasList", data)
  },


  async find({
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/tasks/`, {
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('set', data.data[0])
  },
  async create({
    state,
    commit,
    dispatch,
  }) {
    const {
      data: data
    } = await this.$axios.post(`/tasks/`, {
      data: state.task
    })
    commit('clear')
  },
  async update({
    state
  }) {
    const {
      data: data
    } = await this.$axios.put(`/tasks/${state.task.id}`, state.task)
    return {
      data: data
    }
  },
  clear({
    commit
  }) {
    commit('set', {
      date: '2022-01-01',
      description: '',
      staff: {},
      priority: 'Medium',
      apartament: {},
      area: 0
    })
  },

}
export const mutations = {
  updateField,
  set(state, data) {
    state.task = data
  },
  setList(state, data) {
    state.taskList = data
  }

}
