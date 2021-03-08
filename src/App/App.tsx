import { useMemo } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.scss";

import { Page } from "./scenes/Page";

function App() {
  const year = new Date().getFullYear();
  const { search } = window.location;

  let postId = useMemo(() => {
    const params = search.substring(1).split("&");

    for (let param of params) {
      if (param.includes("id")) {
        const [_, value] = param.split("=");

        return value;
      }
    }

    return "";
  }, [search]);

  return (
    <div className="main">
      <header className="main-header">
        <a href="/" className="main-header-text">React Blog</a>
      </header>
      <section className="main-content">
        <BrowserRouter>
          <Route path="/post">
            <Page postId={postId} />
          </Route>
          <Route path="/" exact>
            Home
          </Route>
        </BrowserRouter>
      </section>
      <footer className="main-footer">&copy; Miguel Ribeiro, {year}</footer>
    </div>
  );
}

export default App;
