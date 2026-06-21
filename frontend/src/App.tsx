import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes/configs/appRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}