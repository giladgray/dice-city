import { AnimationFeature, MotionConfig } from "framer-motion";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import styles from "../styles/index.module.css";
import { FastDice } from "../src/FastDice";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <MotionConfig features={[AnimationFeature]}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script type="text/javascript">
          {`window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
heap.load("1770288665");`}
        </script>
        <title>Dice City</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Dice City&nbsp;</h1>
          <h5>where the dice are dicey and the rolls are spicy</h5>
          <address className={styles.attrib}>
            Made with {"</>"} by {link("https://twitter.com/giladgray", "@giladgray")}
            {" – "}
            {link("https://github.com/giladgray/dice-city", "GitHub")}
            {" – "}
            {link("https://www.flaticon.com/free-icon/dice_459493", "Favicon source")}
          </address>
        </div>
        <FastDice />
      </header>
      <Component {...pageProps} />;
    </MotionConfig>
  );
}

function link(href: string, text: string) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}
