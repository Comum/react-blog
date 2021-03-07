import { useMemo } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Page } from "./scenes/Page";

function App() {
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
    <div>
      <BrowserRouter>
        <Route path="/post">
          <Page postId={postId} />
        </Route>
        <Route path="/" exact>
          Home
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
