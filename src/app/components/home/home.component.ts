import { Component, OnInit } from "@angular/core";
const remote = require("electron").remote;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  minEvent(event) {
    var window = remote.getCurrentWindow();
    window.minimize();
  }

  maxEvent(event) {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }

  xEvent(event) {
    var window = remote.getCurrentWindow();
    window.close();
  }
}
