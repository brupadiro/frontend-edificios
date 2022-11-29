import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

export const state = () => ({
  staffList: {
    data: [],
    meta: {}
  },
  staff: {
    entry_hour: '00:00',
    exit_hour: '00:00',
    user: {},
    file: null,
    area: 'Mantenimiento'
  },
  user: {
    name: '',
    phone: '',
    username: ''
  }
})
export const getters = {
  getField,
  get(state) {
    return state.staff;
  },
  getUser(state) {
    return state.user;
  },
  getList(state) {
    return state.staffList;
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
    const {
      data: data
    } = await this.$axios.get(`/staffs/`, {
      params: {
        populate: 'user,photo',
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
  async find({
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/staffs/`, {
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


    const createUser = async function (vm) {
      return new Promise(async (resolve, reject) => {
        dispatch('users/set', {
          ...state.user,
          password: state.user.username,
          building: vm.$auth.user.building.id
        }, {
          root: true
        })
        const data = await dispatch('users/create', {
          type: 'staff',
        }, {
          root: true
        })
        if (data.data) {
          resolve(data.data)
        } else {
          reject('error putos')
        }
      })
    }

    return await createUser(this).then(async (user) => {
      return new Promise(async (resolve, reject) => {
        try {
          const {
            data: data
          } = await this.$axios.post(`/staffs/`, {
            data: {
              ...state.staff,
              user: user.id,
              building: this.$auth.user.building.id,
            }
          })
          await dispatch('upload',data.data.id)
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })

    })
  },
  async update({
    state
  }) {
    try {
      const {
        data: data
      } = await this.$axios.put(`/staffs/${state.staff.id}`, state.staff)
      return {
        data: data
      }

    } catch (error) {
      return {
        data: false
      }
    }
  },
  async upload({
    state
  },staffId) {
    var form = new FormData()
    form.append('ref', 'api::staff.staff')
    form.append('refId', staffId)
    form.append('field', 'photo')
    form.append(`files`, state.staff.file, state.staff.file.name);
    await this.$axios.post('/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  clear({
    commit
  }) {
    commit('set', {
      entry_hour: '00:00',
      exit_hour: '00:00',
      phone: '',
      area: '',
      user: {},
      file: null
    })
  },
  clearUser({
    commit
  }) {
    commit('setUser', {
      name: '',
      phone: '',
      username: ''
    })
  },

}
export const mutations = {
  updateField,
  set(state, data) {
    state.staff = {
      ...state.staff,
      ...data
    }
  },
  setUser(state, data) {
    state.user = data
  },
  setList(state, data) {
    state.staffList = data
  }

}
