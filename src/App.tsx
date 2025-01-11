import { BrowserRouter, Route, Routes } from "react-router";
import { privateRoutes, publicRoutes } from "./pages/routes";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PrivateRoute />}
              >
                <Route path={route.path} element={<route.element />} />
              </Route>
            ))}
          </Routes>

          <footer>(c) 2025 MB Skafis, naglis.suliokas@gmail.com</footer>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
