import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./src/analytics";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // index.html already fires the first PageView; track later SPA navigations here.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
