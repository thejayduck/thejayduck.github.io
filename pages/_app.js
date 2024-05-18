import "../styles/globals.scss";
import "../styles/variables.scss";

import ScrollManager from "../components/scrollManager";
import ThemeToggle from "../components/themeToggle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeToggle />
      <ScrollManager />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
