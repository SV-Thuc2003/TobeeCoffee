import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/AppRoute";
import "./i18n/i18n";

import "./index.css";

function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App;
