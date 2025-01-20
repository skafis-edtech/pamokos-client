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

          <footer>
            &copy; 2025 MB Skafis,{" "}
            <a href="mailto:info@skafis.lt">info@skafis.lt</a>
          </footer>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
