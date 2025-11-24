import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class Pagination {
  @Output() pageChange = new EventEmitter<{ page: number, size: number }>();
  @Input() page: number = 1;
  @Input() size: number = 10;
  @Input() collectionSize: number = 0;

  prev() {
    if (this.page > 1) {
      this.page--;
      this.emitChange();
    }
  }

  goto(page: number) {
    if (page !== this.page && page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.emitChange();
    }
  }

  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.emitChange();
    }
  }

  private emitChange() {
    this.pageChange.emit({ page: this.page, size: this.size });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.collectionSize / this.size));
  }

  get displayPages(): (number | '...')[] {
    const pages: (number | '...')[] = [];
    const total = this.totalPages;
    const current = this.page;

    pages.push(1);

    const left = current - 1;
    const right = current + 1;

    if (left > 2) pages.push('...');
    if (left > 1) pages.push(left);

    if (current !== 1 && current !== total) pages.push(current);

    if (right < total) pages.push(right);
    if (right < total - 1) pages.push('...');

    if (total > 1) pages.push(total);

    return pages;
  }
}
