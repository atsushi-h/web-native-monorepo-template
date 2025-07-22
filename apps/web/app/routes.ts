import { index, type RouteConfig, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/tamagui-example', 'routes/tamagui-example.tsx'),
] satisfies RouteConfig
