export const getLeftMenuData = [
  {
    title: 'Empresas',
    key: 'instituicoes',
    url: '/home',
    icon: 'icmn icmn-home',
  },

]
  
export const getTopMenuData = [
  {
    title: 'Pages',
    key: 'pages',
    icon: 'icmn icmn-stack',
    children: [
      {
        title: 'Dashboard Alpha',
        key: 'dashboardAlpha',
        url: '/dashboard/alpha',
      },
      {
        title: 'Dashboard Beta',
        key: 'dashboardBeta',
        url: '/dashboard/beta',
        pro: true,
      },
    ],
  },
]
  