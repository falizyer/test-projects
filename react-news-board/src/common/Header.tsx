import React, { useContext, PropsWithChildren } from "react";
import { AppStoreContext, ThemeStoreContext } from "store";
import { useTranslation } from "react-i18next";
import Logo from "../../public/logo512.png";

import "./Header.scss";

export default function(props: PropsWithChildren<{}>) {
  const { t } = useTranslation();
  const { title } = useContext(AppStoreContext);
  const { theme } = useContext(ThemeStoreContext);
  return (
    <header className={`rnb-header rnb-${theme}-theme`}>
      <h1 className="rnb-header__title">
        <img src={Logo} title={t(title)} alt={t(title)} />
      </h1>
      <div className="rnb-header__content">{props.children}</div>
    </header>
  );
}
