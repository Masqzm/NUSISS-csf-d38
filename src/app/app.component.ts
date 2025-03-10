import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'day38';

  ngOnInit(): void {
    console.info('>>> ', this.title)
    // @ts-ignore
    console.info('>>> ', window['mydata'])
    // @ts-ignore
    this.title = window['mydata']   // mtd to pass data into app root
}
}
