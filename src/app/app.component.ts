import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  _beforeUnload_time = 0;
  _gap_time = 0;

  ngOnInit(): void {

    window.onunload = () => {
      this._gap_time = new Date().getTime() - this._beforeUnload_time;
      if (this._gap_time <= 5) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
      }
    };

    window.onbeforeunload = () => {
      this._beforeUnload_time = new Date().getTime();
    };
  }
}
