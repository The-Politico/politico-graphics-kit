![](https://www.politico.com/interactives/cdn/images/badge.svg)

# @politico/graphics-kit

### Install

```
$ yarn add @politico/graphics-kit
```

### Use

```javascript
import { ChartComponent, d3 } from '@politico/graphics-kit';

class MyChart extends ChartComponent {
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

Add this [snippet](snippets/ChartComponent.cson) to Atom.
