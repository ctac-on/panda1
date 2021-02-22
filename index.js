import React from "react";
import ReactDOM from "react-dom";

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


import App from "./app.js";

const theApp = (
    <App />
)

ReactDOM.render(theApp, document.getElementById('root'));