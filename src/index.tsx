import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'App';
import { store } from 'app/store';
import 'assets/fonts/index.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import './index.css';
import 'i18n/config';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
