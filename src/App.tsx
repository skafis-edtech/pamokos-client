import MobileHeader from "./components/MobileHeader";
import DesktopHeader from "./components/DesktopHeader";
import { BrowserRouter, Route, Routes } from "react-router";
import { routes } from "./pages/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <MobileHeader isLoggedIn={false} />
          <DesktopHeader isLoggedIn={false} />
        </header>
        <main>
          <aside></aside>
          <section>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </section>
          <aside></aside>
        </main>
        <footer>(c) 2025 MB Skafis, naglis.suliokas@gmail.com</footer>
      </BrowserRouter>
    </>
  );
}

export default App;
