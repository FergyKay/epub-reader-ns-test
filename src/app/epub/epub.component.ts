import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebViewInterface } from 'nativescript-webview-interface';
import { WebView } from 'tns-core-modules/ui/web-view/web-view';
import { isAndroid, isIOS } from 'tns-core-modules/ui/page/page';
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures";



@Component({
  selector: 'ns-epub',
  templateUrl: './epub.component.html',
  styleUrls: ['./epub.component.css']
})
export class EpubComponent implements OnInit {
  @ViewChild('webview', { static: true }) webview: ElementRef
  private webViewInterface: WebViewInterface;
  showControls = true;
  public direction: number;
  public currentFontSize = 8
  viewMode = 0 //1 is dark

  constructor() {

  }

  ngOnInit(): void {
    console.log("init")
  }

  wvloaded() {
    this.webViewInterface = new WebViewInterface(this.webview.nativeElement,
      '~/app/www/epub.html');

    if (isAndroid) {
      let settings = this.webview.nativeElement.android.getSettings()
      settings.setJavaScriptEnabled(true);
      settings.setAllowFileAccess(true);
      settings.setAllowContentAccess(true);
      settings.setAllowFileAccessFromFileURLs(true);
      settings.setAllowUniversalAccessFromFileURLs(true);
      settings.setBuiltInZoomControls(false);
      settings.setDisplayZoomControls(false);
    }

    if(isIOS){
      this.webview.nativeElement.ios.scrollView.bounces = false; 
       }


    this.webview.nativeElement.on(WebView.loadFinishedEvent, () => {
      this.webViewInterface.emit('loadBook', 'rj.epub');
    });
  }

  nextPage() {
    this.webViewInterface.emit('nextPage', '');
  }

  prevPage() {
    this.webViewInterface.emit('prevPage', '');
  }

  toggleControls() {
    this.showControls = !this.showControls
  }

  onSliderValueChange(value) {
    this.currentFontSize = value
    this.webViewInterface.emit('font-change', value)
    //    console.log(value)
  }


  switchToMode(mode) {
   this.viewMode = mode
   this.webViewInterface.emit('viewMode',mode)
  }

}
