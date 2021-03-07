import type { FC } from "react";

interface PageProps {
  postId?: string;
}

const Page: FC<PageProps> = (props) => {
  const { postId, ...remainingProps } = props;

  return <div {...remainingProps}>{postId}</div>;
};

export { Page };
