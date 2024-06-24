import classNames from "classnames/bind";

import styles from "./Loader.module.css";

const cn = classNames.bind(styles);

function Loader() {
  return <div className={cn("loader")} />;
}

export default Loader;
