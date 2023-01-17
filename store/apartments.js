import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');


import axios from 'axios';
export const state = () => ({
  apartments: {
    data: [],
    meta: {
      pagination: {}
    }
  },
  apartment: {
    number: 0,
    rooms: 0,
    bathrooms: 0,
    square_meters: 0,
    payment_method: 0,
    amenities: [],
    expenses_currency: 'UYU',
    expenses_payment_method: 'Card',
    expenses_cost: 0,
    in_rent: true,
  },
  files: []
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
  interceptor({}, response) {
    if (response.data) {
      var attributes = {}
      if (response) {
        attributes = response
      } else if (response.data[0]) {
        attributes = response.data[0]
      } else {
        return response
      }
      console.log(attributes)
      if (attributes.amenities.data) {
        attributes.amenities = attributes.amenities.data.map((amenity) => {
          return amenity.id
        })
      }
      if (attributes.invoices) {
        attributes.invoices = attributes.invoices.map((amenity) => {
          return amenity.id
        })
      }
    }
    return {
      data: response
    }
  },


  async findAll({
    state,
    commit,
    dispatch
  }, params = {}) {
    dispatch('clearList')
    const {
      data: data
    } = await this.$axios.get('/apartaments', {
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
    commit,
    dispatch
  }, query) {

    const {
      data: data
    } = await this.$axios.get(`/apartaments/`, {
      params: {
        filters: query,
        populate: '*'
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    console.log(data)
    commit('set', {
      ...data.data[0]
    })
    commit('setFiles', data.data[0].files)
  },
  async count({},params){
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: data
        } = await this.$axios.get('/apartaments/count', {
          params:params,
        paramsSerializer: params => {
          return qs.stringify(params, {
            arrayFormat: 'brackets'
          })
        }
      },

      )
        resolve(data.data)
      } catch (error) {
        reject(error)
      }
    })

  },
  async create({
    state,
    commit,
    dispatch
  }) {
    
    return new Promise(async (resolve, reject) => {
      try {
        const {
          data: data
        } = await this.$axios.post('/apartaments?populate=amenities,invoices', {
          data: {
            ...state.apartment,
          }
        })
        console.log(data.data)
        commit('set', {
          ...data.data,
          id: data.data.id
        })    
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  },
  async update({
    commit,
    state,
    dispatch
  }) {
    commit('deleteApartmentFiles')
    const {
      data: data
    } = await this.$axios.put(`/apartaments/${state.apartment.id}/?populate=amenities,invoices`, {
      data: {
        ...state.apartment,
      }
    })
    commit('set', {
      ...data,
    })
    return data
  },
  async delete({
    dispatch,
    state
  }, id) {
    await this.$axios.delete(`/apartaments/${id}`)
    dispatch('findAll')
  },
  clear({
    commit
  }) {
    commit('set', {
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
  },

  clearList({
    commit
  }) {
    commit('setList', {
      data: [],
      meta: {
        pagination: {}
      }
    })
  },


  async addInvoices({
    commit
  }, params) {
    const {
      data: data
    } = await this.$axios.get(`/apartaments/${params.id}/?populate=*`)
    this.$axios.put('/apartaments/' + params.id, {
      data: {
        invoices: [
          ...data.data.invoices,
          params.invoice
        ]
      }
    })
  },
  async checkIfExists({}, number) {
    const {
      data: data
    } = await this.$axios.get(`/apartaments/`, {
      params: {
        filters: {
          number: number
        },
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    return data.meta.pagination.total > 0
  },
  set({
    commit
  }, params) {
    commit('set', params)
  },
  setFiles({
    commit
  }, params) {
    commit('setFiles', params)
  },


}
export const mutations = {
  updateField,
  set(state, apartment) {
    console.log(apartment)
    state.apartment = apartment
  },
  setList(state, data) {
    state.apartments = data
  },
  setFiles(state, data) {
    state.files = data
  },
  deleteApartmentFiles(state) {
    delete state.apartment.files
  }

}
