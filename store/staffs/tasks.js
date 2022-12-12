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
    area: null,
    file: null,
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
    commit,
    dispatch
  }, query) {
    dispatch('clearList')
    const {
      data: data
    } = await this.$axios.get(`/tasks/`, {
      params: {
        populate: 'staff.user,apartament,area,file',
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
  async updateTask({
    state
  }, {
    id,
    status,
    file
  }) {


    var form = new FormData()
    if (file instanceof File) {
      form.append('files.file', file)
    }
    form.append('data', JSON.stringify({status:status}))

    return new Promise(async (resolve, reject) => {
      return await this.$axios.put(`/tasks/${id}`, form,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })

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
  clearList({
    commit
  }) {
    commit('setList', {
      data: [],
      meta: {}
    })
  }
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
