import { cilApplications, cilCode, cilCog, cilSpeedometer } from '@coreui/icons'

export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: 'dashboard',
    icon: cilSpeedometer,
  },
  {
    component: 'CNavItem',
    name: 'Instances',
    to: 'instance.index',
    icon: cilApplications,
  },
  {
    component: 'CNavItem',
    name: 'Plugins',
    to: 'plugin.index',
    icon: cilCog,
  },
  {
    component: 'CNavItem',
    name: 'Scripts',
    to: 'script.index',
    icon: cilCode,
  },
]
