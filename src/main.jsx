import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { init } from './init.js';

import './index.css'
import App from './App/App.jsx'

import '@telegram-apps/telegram-ui/dist/styles.css';


// Mock the environment in case, we are outside Telegram.
import './mockEnv.js';

// Configure all application dependencies.
init(retrieveLaunchParams().startParam === 'debug');

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <main className="dark text-foreground">
        <App />
      </main>
    </NextUIProvider>
  </QueryClientProvider>
)
