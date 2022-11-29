export default {
    data() {
        return {
            userItems: [{
              icon: 'apps',
              title: 'Inicio',
              to: '/accounts/me'
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