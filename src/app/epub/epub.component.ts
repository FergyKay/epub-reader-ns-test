import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebViewInterface } from 'nativescript-webview-interface';
import { WebView } from 'tns-core-modules/ui/web-view/web-view';



@Component({
  selector: 'ns-epub',
  templateUrl: './epub.component.html',
  styleUrls: ['./epub.component.css']
})
export class EpubComponent implements OnInit {
  @ViewChild('webview',{static:true}) webview: ElementRef
  private webViewInterface: WebViewInterface;


  constructor() { }

  ngOnInit(): void {

 

  }

  wvloaded(){
    this.webViewInterface = new WebViewInterface(this.webview.nativeElement ,
      '~/app/www/epub.html');
    this.webview.nativeElement.on(WebView.loadFinishedEvent, () => {
      
      this.webViewInterface.emit('loadBook', 'moby-dick.epub');
    });
  }

  nextPage(){
    this.webViewInterface.emit('nextPage','');
  }

  prevPage(){
    this.webViewInterface.emit('prevPage','');
  }

}
