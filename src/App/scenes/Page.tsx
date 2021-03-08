import type { FC } from "react";

import "./Page.scss";

interface PageProps {
  postId?: string;
}

const Page: FC<PageProps> = (props) => {
  const { postId, ...remainingProps } = props;

  return (
    <div className="page" {...remainingProps}>
      Content {postId}
    </div>
  );
};

export { Page };
