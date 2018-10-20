import { Component, Prop, Event, EventEmitter } from '@stencil/core';

import { IResizeEvent } from './interfaces';

import 'split-me';

@Component({
  tag: 'square-me',
  styleUrl: 'square-me.css',
  shadow: true
})
export class SquareMe {
  /**
   * The number of columns in the grid.
   */
  @Prop()
  n: number = 1;

  /**
   * The initial column sizes.
   * Acceptable formats are: `"0.33, 0.67"` or `"50%, 25%, 25%"`
   */
  @Prop({ mutable: true })
  sizesH: string | number[] = '';

  /**
   * The columns minimum sizes
   */
  @Prop()
  minSizesH: string | number[] = '';

  /**
   * The columns maximum sizes
   */
  @Prop()
  maxSizesH: string | number[] = '';

  /**
   * Prevent columns from being resized
   */
  @Prop()
  fixedH: boolean = false;

  /**
   * The minimum time (in ms) between column resize events while dragging.
   */
  @Prop()
  throttleH: number = 0;

  /**
   * The number of rows in the grid.
   */
  @Prop()
  m: number = 1;

  /**
   * The initial row sizes.
   * Acceptable formats are: `"0.33, 0.67"` or `"50%, 25%, 25%"`
   */
  @Prop()
  sizesV: string | number[] = '';

  /**
   * The rows minimum sizes
   */
  @Prop()
  minSizesV: string | number[] = '';

  /**
   * The rows maximum sizes
   */
  @Prop()
  maxSizesV: string | number[] = '';

  /**
   * Prevent rows from being resized
   */
  @Prop()
  fixedV: boolean = false;

  /**
   * The minimum time (in ms) between row resize events while dragging.
   */
  @Prop()
  throttleV: number = 0;

  /**
   * Emitted every time dragging causes the columns to resize
   */
  @Event()
  slotResizedH: EventEmitter<IResizeEvent>;

  /**
   * Emitted every time dragging causes the rows to resize
   */
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
