import React, { useContext, PropsWithChildren } from "react";
import { AppStoreContext, ThemeStoreContext } from "store";
import { useTranslation } from "react-i18next";

export default function(props: PropsWithChildren<{}>) {
  const { t } = useTranslation();
  const { title } = useContext(AppStoreContext);
  const { theme } = useContext(ThemeStoreContext);
  return (
    <header className={`rnb-app-header rnb-${theme}-theme`}>
      <h1 className="rnb-app-header__title">{t(title)}</h1>
      <div className="rnb-app-header__container">{props.children}</div>
    </header>
  );
}
