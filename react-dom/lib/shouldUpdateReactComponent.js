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

/**
 * Given a `prevElement` and `nextElement`, determines if the existing
 * instance should be updated as opposed to being destroyed or replaced by a new
 * instance. Both arguments are elements. This ensures that this logic can
 * operate on stateless trees without any backing instance.
 *
 * @param {?object} prevElement
 * @param {?object} nextElement
 * @return {boolean} True if the existing instance should be updated.
 * @protected
 */
//TODO 2017.2.27 凌晨，看完这里了，从ReactMount.js 来的
function shouldUpdateReactComponent(prevElement //旧元素
  , nextElement /*新元素*/) {
  var prevEmpty = prevElement === null || prevElement === false; //检查旧元素是否为空
  var nextEmpty = nextElement === null || nextElement === false; //检查新元素是否为空
  if (prevEmpty || nextEmpty) { //如果有一个为空
    //判断旧元素和新元素是否都为空，如果仅有一个不是空的，就不更新了，如果都是空的，还需要更新
    return prevEmpty === nextEmpty;
  } else { //如果都不为空
    //检查新元素的类型
    var prevType = typeof prevElement;
    var nextType = typeof nextElement;
    
    if (prevType === 'string' || prevType === 'number') {
      //同为字符串或数字(即元素对应的节点nodeType不是1，不是DOM元素)，必须更新
      return nextType === 'string' || nextType === 'number';
    } else {
      //如果是对象（即React元素实例）
      // 并且这两者的 type属性相同
      // 并且 key 也是相同的 ！！！这很关键
      //这个告诉我们当key或者type有有一个不同就会触发重新渲染元素
      return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
  }
  
}

module.exports = shouldUpdateReactComponent;