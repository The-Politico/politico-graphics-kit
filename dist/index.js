(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3'), require('lodash/merge')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3', 'lodash/merge'], factory) :
  (global = global || self, factory(global['@politico/graphics-kit'] = {}, global.d3, global.merge));
}(this, function (exports, d3, merge) { 'use strict';

  merge = merge && merge.hasOwnProperty('default') ? merge['default'] : merge;

  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.appendChild(this);
    });
  };

  d3.selection.prototype.moveToBack = function () {
    return this.each(function () {
      const firstChild = this.parentNode.firstChild;

      if (firstChild) {
        this.parentNode.insertBefore(this, firstChild);
      }
    });
  };

  d3.selection.prototype.appendSelect = function (el, cls) {
    const selected = cls ? this.select(`${el}.${cls.split(' ').join('.')}`) : this.select(el);

    if (selected.empty()) {
      return cls ? this.append(el).classed(cls, true) : this.append(el);
    }

    return selected;
  };

  class ChartError extends Error {
    constructor(constructorName = 'Chart component') {
      super(constructorName);
      this.constructorName = constructorName;
      this.name = 'ChartComponentError';
    }

  }
  class ErrorDrawMethodUndefined extends ChartError {
    get message() {
      return `${this.constructorName} should have a draw method`;
    }

  }
  class ErrorSelectorType extends ChartError {
    get message() {
      return `${this.constructorName} selector should be a DOM Element or selector string`;
    }

  }
  class ErrorPropsType extends ChartError {
    get message() {
      return `${this.constructorName} props should be an Object`;
    }

  }
  class ErrorDataType extends ChartError {
    get message() {
      return `${this.constructorName} data should be an Array`;
    }

  }

  class ChartComponent {
    constructor(selector, props, data) {
      this.selection(selector);
      this.props(props);
      this.data(data);
    }

    selection(selector) {
      if (!selector) return this._selection;

      if (!(selector instanceof Element) && typeof selector !== 'string') {
        throw new ErrorSelectorType(this.constructor.name);
      }

      this._selection = d3.select(selector);
      return this;
    }

    get defaultProps() {
      return {};
    }

    props(obj) {
      if (!obj) return this._props || this.defaultProps;

      if (!(obj instanceof Object)) {
        throw new ErrorPropsType(this.constructor.name);
      }

      this._props = merge(this._props || this.defaultProps, obj);
      return this;
    }

    get defaultData() {
      return [];
    }

    data(arr) {
      if (!arr) return this._data || this.defaultData;

      if (!(arr instanceof Array)) {
        throw new ErrorDataType(this.constructor.name);
      }

      this._data = arr;
      return this;
    }

    draw() {
      throw new ErrorDrawMethodUndefined(this.constructor.name);
    }

  }

  exports.BaseChart = ChartComponent;
  exports.d3 = d3;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
