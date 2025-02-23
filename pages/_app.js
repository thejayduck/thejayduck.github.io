import "../styles/globals.scss";
import "../styles/variables.scss";

import ScrollManager from "../components/scrollManager";
import ThemeToggle from "../components/themeToggle";
import { ToastHandler } from "../components/toashHandler";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeToggle />
      <ScrollManager />
      <ToastHandler>
        <Component {...pageProps} />
      </ToastHandler>
    </>
  );
}

export default MyApp;
