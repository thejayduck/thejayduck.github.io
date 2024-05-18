import "../styles/globals.scss";
import "../styles/variables.scss";

import ThemeToggle from "../components/themeToggle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeToggle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
