import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

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
    expenses_payment_method: 'Card',
    expenses_cost: 0,
    in_rent: false,
    files: {}
  },
  files: {
    data: []
  }
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
    commit('set', {
      ...data.data[0].attributes,
      id: data.data[0].id
    })
    commit('setFiles', data.data[0].attributes.files)
  },
  async create({
    state,
    commit
  }) {


    var formatedData = function (apartment) {
      var data = JSON.parse(JSON.stringify(apartment))
      delete data.files
      return data
    }


    const {
      data: data
    } = await this.$axios.post('/apartaments', {
      data: formatedData(state.apartment)
    })
    return data
  },
  async update({
    commit,
    state,
    dispatch
  }, files = []) {


    var formatedData = function (apartment) {
      var data = JSON.parse(JSON.stringify(apartment))
      if (data.amenities.data != null) {
        data.amenities = data.amenities.data.map(amenity => amenity.id)
      } else {
        data.amenities = []
      }
      if (data.invoices.data) {
        data.invoices = data.invoices.data.map(invoice => invoice.id)
      } else {
        data.invoices = []
      }
      delete data.files
      return data
    }
    const {
      data: data
    } = await this.$axios.put(`/apartaments/${state.apartment.id}/?populate=*`, {
      data: formatedData(state.apartment)
    })
    commit('set', {
      ...data.data.attributes,
      id: data.data.id
    })
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
  async addInvoices({
    commit
  }, params) {
    const {
      data: data
    } = await this.$axios.get(`/apartaments/${params.id}/?populate=*`)
    console.log()
    this.$axios.put('/apartaments/' + params.id, {
      data: {
        invoices: [
          ...data.data.attributes.invoices.data,
          params.invoice
        ]
      }
    })
  },
  set({
    commit
  }, params) {
    commit('set', params)
  }

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
    console.log(data)
    state.files = data
  }

}
