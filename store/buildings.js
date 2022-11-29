var qs = require('qs');
export const buildings = {
    async getAllBuildings(params = {}) {
      const {
        data: data
      } = await this.$axios.get('/buildings', {
        params: params
      })
      return data
    },
    async getSingleBuilding() {
      const {
        data: data
      } = await this.$axios.get(`/buildings/${id}`)
      return data
    },
    async createBuilding(params = {}) {
      const {
        data: data
      } = await this.$axios.post('/buildings', {
        data: params
      })
      return data
    },
    async updateBuilding(id, params = {}) {
      const {
        data: data
      } = await this.$axios.put(`/buildings/${id}`, params)
      return data
    },
    async deleteBuilding(id, params = {}) {
      const {
        data: data
      } = await this.$axios.delete(`/buildings/${id}`, params)
      return data
    },
  }
  