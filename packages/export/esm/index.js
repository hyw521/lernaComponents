import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message } from "antd";
import React, { useState } from "react";
import axios from "axios";

var Export = function Export(props) {
  var replaceElement = props.replaceElement,
      _props$text = props.text,
      text = _props$text === void 0 ? "导出" : _props$text,
      url = props.url,
      _props$methods = props.methods,
      methods = _props$methods === void 0 ? "a" : _props$methods,
      fileName = props.fileName,
      _props$isNewWindow = props.isNewWindow,
      isNewWindow = _props$isNewWindow === void 0 ? true : _props$isNewWindow;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var handleDownload = function handleDownload() {
    if (methods === "a") {
      aDownload(url);
    } else {
      streamDownload(url);
    }
  };

  function aDownload(url) {
    var a = document.createElement("a");
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

  function streamDownload(url) {
    axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache"
      },
      responseType: "blob"
    }).then(function (data) {
      var reg = /fileName=.*/;
      var regInner = reg.exec(data.headers["content-disposition"]);
      var file_name = "";

      if (regInner) {
        file_name = regInner[0].slice(9);
        file_name = decodeURI(file_name);
      }

      if (fileName) {
        file_name = fileName;
      }

      var reader = new FileReader();

      reader.onload = function () {
        try {
          var resData = JSON.parse(this.result);

          if (resData && resData["code"]) {
            message.error(resData["message"]);
          }
        } catch (error) {
          var blob = new Blob([data.data]);
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接

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
    })["catch"](function (e) {
      if (e.message.includes("404")) {
        message.error("文件不存在");
        setLoading(false);
        return;
      }

      setLoading(false);
      message.error("网络错误，请稍后再试");
    });
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, replaceElement && replaceElement(handleDownload), !replaceElement && /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    loading: loading,
    onClick: handleDownload
  }, text));
};

export default Export;