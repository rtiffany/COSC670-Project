import * as React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Index from './routes/Index.jsx';
import ConfigurePoll from './routes/ConfigurePoll.jsx';
import Vote from './routes/Vote.jsx';
import VoterLogin from './routes/VoterLogin.jsx';
import PollDash from './routes/PollDash.jsx';
import Results from './routes/Results.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Index/>},
      {
        path: "configurePoll",
        element: <ConfigurePoll/>,
      },
      {
        path: "voterLogin",
        element: <VoterLogin/>,
      },
      {
        path: "voterLogin/vote",
        element: <Vote/>,
      },
      {
        path: "configurePoll/pollDash",
        element: <PollDash/>
      },
      {
        path: "Results",
        element: <Results/>
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
