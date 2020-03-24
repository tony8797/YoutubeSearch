import React, { lazy, Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
// import Loader from '@iso/components/utility/loader';
import { Spin } from 'antd';

// 路徑設定
const publicRoutes = [
  {
    // path: '/YoutubeSearch', // github page
    path: '/',
    component: lazy(() => import('./containers/YoutubeSearch/YoutubeSearch')),
    exact:true
  },
  {
    // path: '/YoutubeSearch/favoriteList', // github page
    path: '/favoriteList',
    component: lazy(() => import('./containers/YoutubeSearch/FavoriteList')),
  },
];

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spin />}>
        <Router >
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route exact={route.exact} key={index} path={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
