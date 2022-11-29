import adminMixin from './admin.js'
import userMixin from './user.js'
import staffMixin from './staff.js'
export default {
  mixins: [adminMixin, userMixin,staffMixin],
  computed: {
    items() {
      switch(this.$auth.user.type) {
        case 'admin':
          return this.adminItems
        case 'user':
          return this.userItems
        case 'staff':
          return this.staffItems
      }
    },
    bottomItems() {


      switch(this.$auth.user.type) {
        case 'admin':
          return this.bottomAdminItems
        case 'user':
          return this.bottomUserItems
        case 'staff':
          return this.staffItems
      }
    }
  }
}
