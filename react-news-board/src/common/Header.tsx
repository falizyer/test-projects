import React, { useContext, PropsWithChildren } from "react";
import { AppStoreContext, ThemeStoreContext } from "store";
import { useTranslation } from "react-i18next";

import "./Header.scss";

export default function(props: PropsWithChildren<{}>) {
  const { t } = useTranslation();
  const { title } = useContext(AppStoreContext);
  const { theme } = useContext(ThemeStoreContext);
  return (
    <header className={`rnb-header rnb-${theme}-theme`}>
      <h1 className="rnb-header__title">{t(title)}</h1>
      <div className="rnb-header__container">{props.children}</div>
    </header>
  );
}
