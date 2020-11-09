import { AnimationFeature, MotionConfig } from "framer-motion";
import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <MotionConfig features={[AnimationFeature]}>
      <Component {...pageProps} />;
    </MotionConfig>
  );
}

export default MyApp;
