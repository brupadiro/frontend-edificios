import habitantsMixin from './habitants.js'
export default {
  mixins: [habitantsMixin],
  methods: {
    async getAllOwners(params = {}) {
      const {
        data: data
      } = await this.$axios.get('/owners', {
        params: params
      })
      return data
    },
    async getSingleOwner() {
      const {
        data: data
      } = await this.$axios.get(`/owners/${id}`)
      return data
    },
    async createOwner(params = {}) {
      await this.$axios.post('/owners', {data:params})
      console.log(params)
      if (params.in_property) {
        await this.createHabitant(params)
      }
    },
    async updateOwner(id, params = {}) {
      const {
        data: data
      } = await this.$axios.put(`/owners/${id}`, params)
      return data
    },
    async deleteOwner(id, params = {}) {
      const {
        data: data
      } = await this.$axios.delete(`/owners/${id}`, params)
      return data
    }
  }
}
