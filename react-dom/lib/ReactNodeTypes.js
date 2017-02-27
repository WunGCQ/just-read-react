/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var React = require('react/lib/React');

var invariant = require('fbjs/lib/invariant');

var ReactNodeTypes = {
  HOST: 0,
  COMPOSITE: 1,
  EMPTY: 2,

  getType: function (node) {
    if (node === null || node === false) { //不存在这个node
      return ReactNodeTypes.EMPTY; //返回空节点类型
    } else if (React.isValidElement(node)) { //如果验证为ReactElement
      if (typeof node.type === 'function') { //如果是function（Class）,
        return ReactNodeTypes.COMPOSITE; //有可能是混合的组件
      } else { //否则
        return ReactNodeTypes.HOST; //否则是组件实体...
      }
    }
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unexpected node: %s', node) : _prodInvariant('26', node) : void 0;
  }
};

module.exports = ReactNodeTypes;