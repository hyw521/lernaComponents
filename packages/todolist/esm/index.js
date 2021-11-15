import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';

var TodoList = function TodoList() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      source = _useState2[0],
      setSource = _useState2[1];

  var init = function init() {
    setSource([{
      name: 'hh',
      age: 24
    }, {
      name: 'yy',
      age: 24
    }, {
      name: 'xx',
      age: 23
    }, {
      name: 'll',
      age: 23
    }]);
  };

  useEffect(function () {
    init();
  }, []);
  return /*#__PURE__*/React.createElement("ul", null, source.map(function (s, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index
    }, s.name);
  }));
};

export default TodoList;