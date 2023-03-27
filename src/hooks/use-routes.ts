import {
  Briefcase,
  CheckSquare,
  Copy,
  Home,
  Icon,
  Tool,
  Users
} from 'react-feather'

type Route = {
  target: string
  Icon: Icon
  label: string
}

export const useRoutes = (): Route[] => {
  const routes: Route[] = [
    { target: '/', Icon: Home, label: 'Início' },
    { target: '/assets', Icon: Tool, label: 'Ativos' },
    { target: '/users', Icon: Users, label: 'Usuários' },
    { target: '/companies', Icon: Briefcase, label: 'Empresas' },
    { target: '/units', Icon: Copy, label: 'Unidades' },
    {
      target: '/workorders',
      Icon: CheckSquare,
      label: 'Ordens de Serviço'
    }
  ]
  return routes
}
