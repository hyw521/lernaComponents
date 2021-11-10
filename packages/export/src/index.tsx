/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message } from "antd";
import React, { useState } from "react";
import { DownloadProps } from "./type";
import axios from "axios";

const Export = (props: DownloadProps) => {
  const {
    replaceElement,
    text = "导出",
    url,
    methods = "a",
    fileName,
    isNewWindow = true,
  } = props;
  const [loading, setLoading] = useState(false);
  const handleDownload = () => {
    if (methods === "a") {
      aDownload(url);
    } else {
      streamDownload(url);
    }
  };
  function aDownload(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.target = isNewWindow ? "_blank" : "";
    if (fileName) {
      // ie不兼容，不同源无效果
      a.download = fileName;
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  function streamDownload(url: string) {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        responseType: "blob",
      })
      .then((data) => {
        const reg = /fileName=.*/;
        const regInner = reg.exec(data.headers["content-disposition"]);
        let file_name = "";
        if (regInner) {
          file_name = regInner[0].slice(9);
          file_name = decodeURI(file_name);
        }
        if (fileName) {
          file_name = fileName;
        }
        const reader = new FileReader();
        reader.onload = function () {
          try {
            const resData = JSON.parse(this.result as string);
            if (resData && resData["code"]) {
              message.error(resData["message"]);
            }
          } catch (error) {
            const blob = new Blob([data.data]);
            const downloadElement = document.createElement("a");
            const href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.target = "_blank";
            downloadElement.download = file_name; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
          } finally {
            setLoading(false);
          }
        };
        reader.readAsText(data.data);
      })
      .catch((e) => {
        if (e.message.includes("404")) {
          message.error("文件不存在");
          setLoading(false);
          return;
        }
        setLoading(false);
        message.error("网络错误，请稍后再试");
      });
  }
  return (
    <>
      {replaceElement && replaceElement(handleDownload)}
      {!replaceElement && (
        <Button type={"primary"} loading={loading} onClick={handleDownload}>
          {text}
        </Button>
      )}
    </>
  );
};

export default Export;
