import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Analytics } from '@vercel/analytics/react';
import "./index.scss";

import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
        <Analytics />
    </Provider>
);
