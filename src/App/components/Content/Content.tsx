import Slider from "react-img-gallery-by-comum";
import type { FC } from "react";

import "./Content.scss";

import type { Post } from "../../../Types/post";

interface ContentProps {
  postId?: number;
  posts?: Post[];
  title?: string;
  hero?: string;
  text?: string;
  additional?: string;
  imgs?: string[];
  infiniteCarousel?: boolean;
}

const Content: FC<ContentProps> = (props) => {
  const {
    postId,
    posts = [],
    title,
    hero,
    text,
    additional,
    imgs = [],
    infiniteCarousel = true,
    ...remainingProps
  } = props;

  return (
    <section className="content" {...remainingProps}>
      <div className="content-info">
        <img src={hero} className="content-hero" />
        <div className="content-title">{title}</div>
        <div className="content-area">
          <div className="content-text">{text}</div>
          <div className="content-slider">
            <Slider imageList={imgs} isInfinite={infiniteCarousel} />
          </div>
          <div className="content-text">{additional}</div>
        </div>
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
