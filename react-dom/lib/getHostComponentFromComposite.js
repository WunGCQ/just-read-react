/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactNodeTypes = require('./ReactNodeTypes');

function getHostComponentFromComposite(inst) {
  var type;

  while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) { //深度遍历查找
      //如果这个实例的_renderedNodeType还是函数或者空, 那么就进一步查找这个链条，直到它的类型是空或者组件的DOM实体
    inst = inst._renderedComponent;
  }
//最终链条找到了不是混合类型的组件，或者查找完整个链条直到这个inst变成了空的
  if (type === ReactNodeTypes.HOST) {  //如果是组件的DOM实体
    return inst._renderedComponent; //就返回这个inst的已经渲染的组件。
  } else if (type === ReactNodeTypes.EMPTY) { //如果是空的
    return null; //返回空咯~
  }
}

module.exports = getHostComponentFromComposite;