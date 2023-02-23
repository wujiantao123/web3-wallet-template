import { type FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import routers from './routes';

// 路由处理方式
const changeRouter = (r: RouteObject[]) => r.map((item) => {
  const route = item;
  if (route.children) {
    route.children = changeRouter(item.children || []);
  }
  route.element = (
    <item.component />
  );
  return route;
});

const App: FC = () => (
  useRoutes(changeRouter(routers))
);

export default App;
