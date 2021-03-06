import * as d3 from 'd3';
import { selection } from 'd3';
import merge from 'lodash/merge';

selection.prototype.moveToFront = function () {
  return this.each(function () {
    this.parentNode.appendChild(this);
  });
};

selection.prototype.moveToBack = function () {
  return this.each(function () {
    const firstChild = this.parentNode.firstChild;

    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};

selection.prototype.appendSelect = function (el, cls) {
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

export { ChartComponent as BaseChart, d3 };
