"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _antd = require("antd");

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable @typescript-eslint/no-explicit-any */
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

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
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
    _axios["default"].get(url, {
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
            _antd.message.error(resData["message"]);
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
        _antd.message.error("文件不存在");

        setLoading(false);
        return;
      }

      setLoading(false);

      _antd.message.error("网络错误，请稍后再试");
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, replaceElement && replaceElement(handleDownload), !replaceElement && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    type: "primary",
    loading: loading,
    onClick: handleDownload
  }, text));
};

var _default = Export;
exports["default"] = _default;