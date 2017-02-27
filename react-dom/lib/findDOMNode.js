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

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('react/lib/ReactCurrentOwner');
var ReactDOMComponentTree = require('./ReactDOMComponentTree');
var ReactInstanceMap = require('./ReactInstanceMap');

var getHostComponentFromComposite = require('./getHostComponentFromComposite');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * Returns the DOM node rendered by this element.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
 *
 * @param {ReactComponent|DOMElement} componentOrElement
 * @return {?DOMElement} The root node of this element.
 */
//开发中经常用到的一个，用于找到一个React组件或元素的对应的DOM节点
function findDOMNode(componentOrElement) {
    //开发环境报错先去掉
    if (process.env.NODE_ENV !== 'production') {
        var owner = ReactCurrentOwner.current; //React目前正在渲染的元素
        if (owner !== null) { //通过这个元素判断是否React正在渲染中
            if (process.env.NODE_ENV !== 'production') {
                warning(owner._warnedAboutRefsInRender, '%s is accessing findDOMNode inside its render(). ' +
                    'render() should be a pure function of props and state. It should ' +
                    'never access something that requires stale data from the previous ' +
                    'render, such as refs. Move this logic to componentDidMount and ' +
                    'componentDidUpdate instead.', owner.getName() || 'A component');
            }
            owner._warnedAboutRefsInRender = true;
        }
    }
    if (componentOrElement == null) { //
        return null;
    }
    if (componentOrElement.nodeType === 1) { //如果检查出这个元素是一个DOM元素，那么返回这个DOM元素本身
        return componentOrElement;
    }

    var inst = ReactInstanceMap.get(componentOrElement); //否则从React的实例字典中查找这个元素的_reactInternalInstance，
    if (inst) { //如果有，那么说明这个元素已经渲染并且被记录，（被标记上了 _reactInternalInstance）;
        inst = getHostComponentFromComposite(inst); //找到这个元素的instance对应的实体
        return inst ? ReactDOMComponentTree.getNodeFromInstance(inst) : null; //
    }

    if (typeof componentOrElement.render === 'function') {
        !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : _prodInvariant('44') : void 0;
    } else {
        !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : _prodInvariant('45', Object.keys(componentOrElement)) : void 0;
    }
}

module.exports = findDOMNode;