import { Component, Prop, Event, EventEmitter } from '@stencil/core';

import { IResizeEvent } from './interfaces';

import 'split-me';

@Component({
  tag: 'square-me',
  styleUrl: 'square-me.css',
  shadow: true
})
export class SquareMe {
  @Prop()
  n: number = 1;
  @Prop({ mutable: true })
  sizesH: string | number[] = '';
  @Prop()
  minSizesH: string | number[] = '';
  @Prop()
  maxSizesH: string | number[] = '';
  @Prop()
  fixedH: boolean = false;
  @Prop()
  throttleH: number = 0;

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
  @Prop()
  throttleV: number = 0;

  @Event()
  slotResizedH: EventEmitter<IResizeEvent>;

  @Event()
  slotResizedV: EventEmitter<IResizeEvent>;

  onColumnResize = (event: CustomEvent<IResizeEvent>) => {
    const { sizes } = event.detail;
    this.sizesH = sizes;
    this.slotResizedH.emit(event.detail);
  };

  onRowResize = (event: CustomEvent<IResizeEvent>) => {
    this.slotResizedV.emit(event.detail);
  };

  render() {
    const rows = [];

    for (let i = 0; i < this.m; ++i) {
      const rowSlots = [];

      for (let j = 0; j < this.n; ++j) {
        rowSlots.push(<slot name={`${i} ${j}`} slot={`${j}`} />);
      }

      rows.push(
        <split-me
          slot={`${i}`}
          n={this.n}
          sizes={this.sizesH}
          minSizes={this.minSizesH}
          maxSizes={this.maxSizesH}
          fixed={this.fixedH}
          onSlotResized={this.onColumnResize}
          throttle={this.throttleH}
        >
          {rowSlots}
        </split-me>
      );
    }

    return (
      <split-me
        n={this.m}
        sizes={this.sizesV}
        minSizes={this.minSizesV}
        maxSizes={this.maxSizesV}
        fixed={this.fixedV}
        onSlotResized={this.onRowResize}
        throttle={this.throttleV}
        d="vertical"
      >
        {rows}
      </split-me>
    );
  }
}
