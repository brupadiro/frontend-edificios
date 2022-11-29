export default {
    data() {
        return {
            staffItems: [{
              icon: 'apps',
              title: 'Inicio',
              to: '/accounts/staff'
            },
            {
              icon: 'logout',
              title: 'Salir',
              to: '/accounts/logout'
            },
          ]
        }
    }
}