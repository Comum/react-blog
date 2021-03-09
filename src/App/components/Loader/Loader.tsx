import type { FC } from "react";

import "./Loader.scss";

const Loader: FC = () => (
  <div className="loader">
    <div className="loader-dot"></div>
    <div className="loader-dot"></div>
    <div className="loader-dot"></div>
    <div className="loader-dot"></div>
    <div className="loader-dot"></div>
    <div className="loader-dot"></div>
  </div>
);

export { Loader };
