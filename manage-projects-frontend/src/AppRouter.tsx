import { Route, Routes } from "react-router-dom"
import { LandingPage } from "./components/landing/LandingPage"
import { Login } from "./components/auth/Login.js"
import { App } from "./components/app/App"
import { SingUp } from "./components/auth/SingUp"

export const AppRouter = () => {
  return <Routes>
    <Route path="/" element={<LandingPage />} />

    <Route path="/login" element={<Login />} />
    <Route path="/sing-up" element={<SingUp />} />

    <Route path="/app" element={<App />} />
  </Routes>
}
