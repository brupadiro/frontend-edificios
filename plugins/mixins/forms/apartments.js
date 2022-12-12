import {
  mapFields
} from 'vuex-map-fields';
export default {
  data() {
    return {
      errorInForm: false,
    }
  },
  methods: {
    async generateFunction(nameFunction, param = null) {
      var generateFunction = function (nameFunction, param = null) {
        console.log(this.$parent.$refs[`form${nameFunction}`].validate())
        console.log(`form${nameFunction}`)
        if (this.$parent.$refs[`form${nameFunction}`].validate()) {
          return new Promise((resolve, reject) => {
            this[`create${nameFunction}`](param).then((response) => {
              resolve(response);
              this.$emit('input', this.value += 1)
            }).catch((error) => {
              reject(error);
            });
          });
        } {
          this.errorInForm = true;
        }
      }.bind(this)
      return await generateFunction(nameFunction, param)
    },
    async createApartments(params = {}) {
      if (this.apartment.id) {
        await this.$store.dispatch("apartments/update");

      } else {
        await this.$store.dispatch("apartments/create");
      }
      this.createFiles()
    },
    async createRentals() {
      this.$store.dispatch('rentals/set', {
        apartment: this.apartment.id,
      })
      await this.$store.dispatch("rentals/create");
      this.$store.dispatch("rentals/clear");
      await this.$store.dispatch('users/clear')
    },
    async createOwners() {
      //add owner as habitant
      this.$store.dispatch('owners/set', {
        apartment: this.apartment.id,
      })
      await this.$store.dispatch("owners/create");
      await this.$store.dispatch('users/clear')


      if(this.apartment.in_rent) {
        await this.createRentals()
      }
    },
    async createFiles() {
      if (this.files.length == 0) return
      var form = new FormData()
      form.append('ref', 'api::apartament.apartament')
      form.append('refId', this.apartment.id)
      form.append('field', 'files')
      this.files.forEach((file) => {
        if (file instanceof File) {
          form.append(`files`, file, file.name);
        }
      });
      try {
        await this.$axios.post('/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

  },
  computed: {
    apartment() {
      return this.$store.getters["apartments/get"];
    },
    owner() {
      return this.$store.getters["owners/get"];
    }
  },

}
