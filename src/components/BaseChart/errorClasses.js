export default class ChartError extends Error {
  constructor(constructorName = 'Chart component') {
    super(constructorName);
    this.constructorName = constructorName;
    this.name = 'ChartComponentError';
  }
}

export class ErrorDrawMethodUndefined extends ChartError {
  get message() {
    return `${this.constructorName} should have a draw method`;
  }
}

export class ErrorSelectorType extends ChartError {
  get message() {
    return `${this.constructorName} selector should be a DOM Element or selector string`;
  }
}

export class ErrorPropsType extends ChartError {
  get message() {
    return `${this.constructorName} props should be an Object`;
  }
}

export class ErrorDataType extends ChartError {
  get message() {
    return `${this.constructorName} data should be an Array`;
  }
}
