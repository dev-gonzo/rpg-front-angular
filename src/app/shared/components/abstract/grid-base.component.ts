import { Directive, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Directive()
export abstract class GridBaseComponent implements OnChanges {
  @Input() col: number = 12;
  @Input() colMd?: number;
  @Input() colLg?: number;
  @Input() className: string = '';

  @HostBinding('class') hostClass = '';

  ngOnChanges(_: SimpleChanges): void {
    this.hostClass = [
      this.colSpan(this.col),
      this.colMd !== undefined ? this.colSpan(this.colMd, 'md:') : '',
      this.colLg !== undefined ? this.colSpan(this.colLg, 'lg:') : '',
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  private colSpan(val?: number, prefix = ''): string {
    const clamped = Math.min(Math.max(val ?? 12, 1), 12);
    return `${prefix}col-span-${clamped}`;
  }
}
