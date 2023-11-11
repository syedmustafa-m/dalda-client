import React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Signin from "./pages/Auth/Signin";
import Dashboard from "./pages/dashboard/dashboard";
import Welcome from "./pages/welcomePage/Welcome";
import Department from "./pages/department/Department";
import Saving from "./pages/saving/Saving";
import DashboardSave from "./pages/DashboardSaving/DashboardSave";
import Idealstatus from "./pages/IdealStatus/Idealstatus";
import { useAuth } from "./context/auth";
import Allideas from "./pages/Allideas/Allideas";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
    const [auth, setAuth] = useAuth();
    // const auth_token = localStorage.getItem('auth');

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={auth.token ? <Dashboard /> : <Signin />}
                ></Route>
                <Route
                    path="/welcome"
                    element={auth.token ? <Welcome /> : <Signin />}
                ></Route>
                <Route
                    path="/depart"
                    element={auth.token ? <Department /> : <Signin />}
                ></Route>
                <Route
                    path="/saving"
                    element={auth.token ? <Saving /> : <Signin />}
                ></Route>
                <Route
                    path="/saving/:id/:idea/:plan/:resources/:savings/:planTime/:file"
                    element={auth.token ? <Saving /> : <Signin />}
                ></Route>
                <Route
                    path="/dashboard"
                    element={auth.token ? <DashboardSave /> : <Signin />}
                ></Route>
                <Route
                    path="/Idealstatus"
                    element={auth.token ? <Idealstatus /> : <Signin />}
                ></Route>
                <Route
                    path="/allideas"
                    element={
                        auth.token && auth.user.role === 1 ? (
                            <Allideas />
                        ) : (
                            <Dashboard />
                        )
                    }
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
