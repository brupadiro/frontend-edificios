export default {
    data() {
        return {
            adminItems: [{
                icon: 'apps',
                title: 'Inicio',
                to: '/'
              },
              {
                icon: 'home',
                title: 'Apartamentos',
                to: '/properties'
              },
              {
                icon: 'account',
                title: 'Visitas',
                to: '/visits'
              },
              {
                icon: 'square-rounded',
                title: 'Zonas comunes',
                to: '/zones',
              },
              {
                icon: 'staff',
                title: 'Staff',
                to: '/staff'
              },
              {
                icon: 'file',
                title: 'Biblioteca',
                to: '/files'
              },
              {
                icon: 'news',
                title: 'Novedades',
                to: '/news'
              },
    
              {
                icon: 'numbers',
                title: 'Contabilidad',
                to: '/accounting'
              },
              {
                icon: 'cog',
                title: 'Configuracion',
                to: '/settings'
              },
            ],
            bottomAdminItems: [{
                icon: 'apps',
                title: 'Inicio',
                to: '/'
              },
              {
                icon: 'home',
                title: 'Apartamentos',
                to: '/properties'
              },
              {
                icon: 'account',
                title: 'Visitas',
                to: '/visits'
              },
              {
                icon: 'square-rounded',
                title: 'Zonas comunes',
                to: '/zones',
              },
              {
                icon: 'more',
                title: 'More',
                subItems: [{
                    icon: 'numbers',
                    title: 'Contabilidad',
                    to: '/accounting'
                  },
                  {
                    icon: 'cog',
                    title: 'Configuracion',
                    to: '/settings'
                  },
                  {
                    icon: 'file',
                    title: 'Biblioteca',
                    to: '/files'
                  },
                  {
                    icon: 'logout',
                    title: 'Salir',
                    to: '/accounts/logout'
                  },
      
                ]
              },
            ],
        }
    }
}