import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.scss";

import { Content } from "./components/Content";
import { Loader } from "./components/Loader";

import { fetchPost, fetchPosts } from "../Api";

import type { Post, Information } from "../Types/post";

function App() {
  const year = new Date().getFullYear();
  const { search } = window.location;

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postError, setPostError] = useState(false);
  const [postInformation, setPostInformation] = useState<Information>({});

  let postId = useMemo(() => {
    const params = search.substring(1).split("&");

    for (let param of params) {
      if (param.includes("id")) {
        const [_, value] = param.split("=");

        return isNaN(parseInt(value, 10)) ? undefined : parseInt(value, 10);
      }
    }

    return undefined;
  }, [search]);

  useEffect(() => {
    setIsLoading(true);
    async function apiFetchPosts() {
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

  useEffect(() => {
    async function apiFetchPost(id: number) {
      const fetchedInformation: Information | undefined = await fetchPost(id);

      if (!fetchedInformation) {
        setPostError(true);
      } else {
        setPostInformation(fetchedInformation);
        setPostError(false);
      }
    }

    if (postId) {
      setIsLoading(true);

      apiFetchPost(postId);
    } else {
      setPostError(true);
    }
  }, [postId]);

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
            {isLoading ? (
              <div className="main-loader">
                <Loader />
              </div>
            ) : postError ? (
              <div className="main-error-message">Post not found</div>
            ) : (
              <Content postId={postId} posts={posts} {...postInformation} />
            )}
          </Route>
          <Route path="/" exact>
            {isLoading ? (
              <div className="main-loader">
                <Loader />
              </div>
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
