import React, { PropsWithChildren } from "react";
import { useForm, ErrorMessage, OnSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Categories, Countries } from "@app/model/NewsApi.model";
import { ArticleParams } from "@app/repository/NewsApi.repository";

import { FormFields } from "./TopHeadLinesForm.constant";

export default function(
  props: PropsWithChildren<{
    onSubmit: OnSubmit<ArticleParams>;
    defaultValues: ArticleParams;
  }>
) {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, getValues } = useForm<ArticleParams>({
    defaultValues: props.defaultValues
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <select
        name={FormFields.country.name}
        placeholder={t(FormFields.country.placeholder)}
        ref={register({
          required: true
        })}
        defaultValue={props.defaultValues.country}
      >
        {Object.values(Countries).map(country => (
          <option key={country} value={country} label={country} />
        ))}
      </select>
      <ErrorMessage name={FormFields.country.name} errors={errors} />

      <select
        name={FormFields.category.name}
        placeholder={t(FormFields.category.placeholder)}
        ref={register}
        defaultValue={props.defaultValues.category}
        defaultChecked={false}
      >
        <option value={void 0} label={""} />
        {Object.values(Categories).map(category => (
          <option key={category} value={category} label={category} />
        ))}
      </select>
      <ErrorMessage name={FormFields.category.name} errors={errors} />

      <input
        type="text"
        name={FormFields.q.name}
        placeholder={t(FormFields.q.placeholder)}
        ref={register({
          pattern: FormFields.q.pattern
        })}
      />
      <ErrorMessage name={FormFields.q.name} errors={errors} />

      <button type={"submit"}>{t("app.buttons.search")}</button>
    </form>
  );
}
