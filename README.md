![](https://www.politico.com/interactives/cdn/images/badge.svg)

# @politico/graphics-kit

### Install

```
$ yarn add @politico/graphics-kit
```

### Use

```javascript
import { BaseChart, d3 } from '@politico/graphics-kit';

class MyChart extends BaseChart {
  defaultProps = {
    stroke: '#ccc',
  }

  defaultData = [60, 40, 20]

  draw() {
    const data = this.data();
    const props = this.props();
    const node = this.selection().node();

    d3.select(node).appendSelect('svg');
    // ...
  }
}
```

### Snippets

Includes [Atom snippets](https://flight-manual.atom.io/using-atom/sections/snippets/) to shortcut building your chart.

- [Chart component](snippets/ChartComponent.cson) demonstrates how to use the base chart component.
- [Chart container](snippets/ChartContainer.cson) imports your chart component into a React container component, with resize and higher-level state hooks.
