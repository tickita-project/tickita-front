import styles from "./Loader.module.css";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

function Loader() {
  return <div className={cn("loader")} />;
}

export default Loader;
