import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReactQueryProvider>
    <App />
  </ReactQueryProvider>
);
