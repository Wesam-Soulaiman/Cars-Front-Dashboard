import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { useTranslation } from "react-i18next";
import rtlPlugin from "stylis-plugin-rtl";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

function RTL(props) {
  const { i18n } = useTranslation();

  return (
    <CacheProvider value={i18n.language === "ar" ? rtlCache : ltrCache}>
      {props.children}
    </CacheProvider>
  );
}

export default RTL;
