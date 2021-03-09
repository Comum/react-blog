import type { FC } from "react";

import "./Content.scss";

import type { Post } from "../../../Types/post";

interface ContentProps {
  postId?: number;
  posts?: Post[];
  title?: string;
  hero?: string;
  text?: string;
}

const Content: FC<ContentProps> = (props) => {
  const {
    postId,
    posts = [
      { id: 123, name: "first" },
      { id: 456, name: "second" },
      { id: 789, name: "third" },
    ],
    title = "title",
    hero = "https://i.picsum.photos/id/3/800/400.jpg?hmac=YENKYu_7ZEBGyasqNHuvLulJbUigva-sPFjXHBfKIkQ",
    text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ...remainingProps
  } = props;

  return (
    <section className="content" {...remainingProps}>
      <div className="content-info">
        <img src={hero} className="content-hero" />
        <div className="content-title">{title}</div>
        <div className="content-text">{text}</div>
      </div>
      <aside className="content-aside">
        <ul className="content-posts">
          {posts?.map((post: Post, index: number) => (
            <li key={index}>
              <a href={`/post?id=${post.id}`} className="content-post-item">
                {post.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export { Content };
