import { Component, Prop } from '@stencil/core';

import 'split-me';

@Component({
  tag: 'grid-me',
  styleUrl: 'grid-me.css',
  shadow: true
})
export class GridMe {
  @Prop()
  n: number = 1;
  @Prop({mutable: true})
  sizesH: string | number[] = '';
  @Prop()
  minSizesH: string | number[] = '';
  @Prop()
  maxSizesH: string | number[] = '';
  @Prop()
  fixedH: boolean = false;

  @Prop()
  m: number = 1;
  @Prop()
  sizesV: string | number[] = '';
  @Prop()
  minSizesV: string | number[] = '';
  @Prop()
  maxSizesV: string | number[] = '';
  @Prop()
  fixedV: boolean = false;

  onColumnResize = (event: CustomEvent) => {
    const { sizes } = event.detail;
    this.sizesH = sizes;
  }

  render() {
    const rows = [];

    for (let i = 0; i < this.n; ++i) {
      const rowSlots = [];

      for (let j = 0; j < this.m; ++j) {
        rowSlots.push(<slot name={`${i} ${j}`} slot={`${j}`} />);
      }

      rows.push(
        <split-me
          slot={`${i}`}
          n={this.m}
          sizes={this.sizesH}
          minSizes={this.minSizesH}
          maxSizes={this.maxSizesH}
          fixed={this.fixedH}
          onSlotResized={this.onColumnResize}
        >
          {rowSlots}
        </split-me>
      );
    }

    return (
      <split-me
        n={this.n}
        sizes={this.sizesV}
        minSizes={this.minSizesV}
        maxSizes={this.maxSizesV}
        fixed={this.fixedV}
        d="vertical"
      >
        {rows}
      </split-me>
    );
  }
}
