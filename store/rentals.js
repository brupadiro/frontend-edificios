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
    front:null,
    back:null,
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
      transformRequest: [function (data, headers) {
        console.log(data)
        return data
      }],
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      },
    })


    if (data.meta.pagination.total > 0) {
      if (data.data[0].user == null) {
        data.data[0].user = {}
      }
      commit('set', {
        ...data.data[0]
      })
      return data.data[0]

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



    const createUser = async function (vm) {
      return new Promise(async (resolve, reject) => {
        dispatch('users/set', {
          ...state.user,
          password: state.user.username,
        }, {
          root: true
        })
        const data = await dispatch('users/create', {
          type: 'tenant',
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
          } = await this.$axios.post(`/rentals/`, {
            data: {
              ...state.rental,
              user: user.id,
            }
          })
          commit('set', data.data)
          await dispatch('upload','front')
          await dispatch('upload','back')
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })

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
      ...data,
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
  clearUser({
    commit
  }, user) {
    commit('clearUser', user)
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
  async upload({
    state
  },field) {
    var form = new FormData()
    form.append('ref', 'api::rental.rental')
    form.append('refId', state.rental.id)
    form.append('field', `doc_${field}`)
    form.append(`files`, state.rental[field], state.rental[field].name);
    await this.$axios.post('/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
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
  clearUser(state, data) {
    state.user = {
      name: '',
      doc: '',
      username: '',
      type: 'tenant',
    }
  },

  setList(state, data) {
    state.tenants = data
  }
}
