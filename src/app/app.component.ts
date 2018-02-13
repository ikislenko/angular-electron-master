import { Component } from "@angular/core";
import { ElectronService } from "./providers/electron.service";
import { TranslateService } from "@ngx-translate/core";
const remote = require("electron").remote;
const MODAL_CSS: string[] = [
  "style.css", // Default.
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
];
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  modalCss = 0;
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang("ru");

    if (electronService.isElectron()) {
      console.log("Mode electron");
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log("c", electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log("c", electronService.childProcess);
    } else {
      console.log("Mode web");
    }
  }

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
  toggleCssInjector() {
    const prev = document.getElementById("injected");
    if (prev) {
      prev.parentNode.removeChild(prev);
    }

    const head = document.head;

    const link = document.createElement("link");
    link.id = "injected";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = MODAL_CSS[this.modalCss];

    head.appendChild(link);

    this.modalCss = (this.modalCss + 1) % MODAL_CSS.length;
  }
}
