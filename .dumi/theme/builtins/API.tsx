import React, { useContext } from "react";
import type { IApiComponentProps } from "dumi/theme";
import { context, useApiData, AnchorLink } from "dumi/theme";
import "./API.less";

const LOCALE_TEXTS = {
  "zh-CN": {
    name: "属性名",
    description: "描述",
    type: "类型",
    default: "默认值",
    required: "(必选)",
  },
  "en-US": {
    name: "Name",
    description: "Description",
    type: "Type",
    default: "Default",
    required: "(required)",
  },
};

export default ({ identifier, export: expt }: IApiComponentProps) => {
  const data = useApiData(identifier);
  const { locale } = useContext(context);
  const texts = /^zh|cn$/i.test(locale)
    ? LOCALE_TEXTS["zh-CN"]
    : LOCALE_TEXTS["en-US"];

  return (
    <>
      {data && (
        <table style={{ marginTop: 24 }} className="api-table">
          <thead>
            <tr>
              <th>
                <span>{texts.name}</span>
              </th>
              <th>
                <span>{texts.description}</span>
              </th>
              <th>
                <span>{texts.type}</span>
              </th>
              <th>
                <span>{texts.default}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data[expt].map((row) => (
              <tr key={row.identifier}>
                <td>
                  <span>{row.identifier}</span>
                </td>
                <td>
                  <span>{row.description || "--"}</span>
                </td>
                <td>
                  <code>{row.type}</code>
                </td>
                <td>
                  <code>
                    {row.default || (row.required && texts.required) || "--"}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
