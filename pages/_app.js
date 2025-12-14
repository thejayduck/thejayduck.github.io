import "@/styles/globals.scss";
import "@/styles/variables.scss";
import "remixicon/fonts/remixicon.css";

import ScrollManager from "@/components/ui/scrollManager";
import ThemeToggle from "@/components/ui/themeToggle";
import { ToastHandler } from "@/components/ui/toashHandler";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastHandler>
        <ThemeToggle />
        <ScrollManager />
        <Component {...pageProps} />
      </ToastHandler>
    </>
  );
}

export default MyApp;
