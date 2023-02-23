import { lazy } from 'react';

const routers = [
  {
    path: '/',
    component: lazy(async () => import('@/Layout')),
    children: [
      {
        path: '/',
        component: lazy(async () => import('@/pages/home/Index')),
      },
    ],
  },
];
export default routers;
