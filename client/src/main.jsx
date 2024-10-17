import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store/store.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "./Components/Theme/ThemeProvider.jsx";

// Importing Pages

import Home from "./Pages/Home.jsx";
import Resume from "./Pages/Resume.jsx";
import Work from "./Pages/Work.jsx";
import Contact from "./Pages/Contact.jsx";
import { Admin } from "./Pages/AdminPage.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import SignIn from "./Pages/Sigin.jsx";
import ProjectDetails from "./Pages/ProjectDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin2213008/signIn",
        element: <SignIn />,
      },
      {
        path: "/works/projectDetails",
        element:<ProjectDetails/>
      },
      {
        path: "/admin2213008",
        element: <Dashboard />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/works",
        element: <Work />,
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);

