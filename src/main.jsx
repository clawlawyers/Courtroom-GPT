//import "regenerator-runtime/runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store.js";

const root = createRoot(document.getElementById("root"));
let persistor = persistStore(store);
root.render(
  <PersistGate persistor={persistor}>
    {/* <Provider store={store}> */}
    <App />
    {/* <Toaster /> */}
    {/* </Provider> */}
  </PersistGate>
);
