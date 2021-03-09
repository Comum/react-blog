import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.scss";

import { Content } from "./components/Content";

import { fetchPost, fetchPosts } from "../Api";

import type { Post } from "../Types/post";

function App() {
  const year = new Date().getFullYear();
  const { search } = window.location;

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function apiFetchPosts() {
      setIsLoading(true);
      const fetchedPosts: Post[] = await fetchPosts();

      setPosts(fetchedPosts);
    }

    apiFetchPosts();
  }, []);

  useEffect(() => {
    if (useEffect.length > 0) {
      setIsLoading(false);
    }
  }, [posts]);

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
        <a href="/" className="main-header-text">
          React Blog
        </a>
      </header>
      <section className="main-content">
        <BrowserRouter>
          <Route path="/post">
            <Content postId={postId} />
          </Route>
          <Route path="/" exact>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <>
                <ul className="main-post-list">
                  {posts.map(({ id, name }) => (
                    <li key={id}>
                      <a href={`/post?id=${id}`}>{name}</a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Route>
        </BrowserRouter>
      </section>
      <footer className="main-footer">&copy; Miguel Ribeiro, {year}</footer>
    </div>
  );
}

export default App;
