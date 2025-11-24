import { Component, signal } from '@angular/core';
import { Pagination } from "./components/pagination/pagination";

@Component({
  selector: 'app-root',
  imports: [Pagination],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('shared-ui');

  page: number = 0;
  size: number = 10;

  pageChange(event: any) {
    this.page = event.page - 1;
    this.size = event.size;
    console.log(event);
  }
}
