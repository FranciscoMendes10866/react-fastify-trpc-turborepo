import ReactDOM from "react-dom/client";
import { NextUIProvider } from '@nextui-org/react';

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
);
