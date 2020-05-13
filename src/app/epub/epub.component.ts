import { Component, OnInit, ViewChild, ElementRef, EventEmitter, ViewContainerRef } from '@angular/core';
import { WebViewInterface } from 'nativescript-webview-interface';
import { WebView } from 'tns-core-modules/ui/web-view/web-view';
import { isAndroid, isIOS } from 'tns-core-modules/ui/page/page';
import { RouterEvent, NavigationExtras } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { TocComponent } from '../toc/toc.component';




@Component({
  selector: 'ns-epub',
  templateUrl: './epub.component.html',
  styleUrls: ['./epub.component.css']
})
export class EpubComponent implements OnInit {
  @ViewChild('webview', { static: true }) webview: ElementRef
  private webViewInterface: WebViewInterface;
  showControls = false;
  public direction: number;
  public currentFontSize = 8
  viewMode = 0 //1 is dark
  tocLoaded = false;

  chapter = new EventEmitter<any>();



  chapters = []



  constructor(private router:RouterExtensions,private _modalService: ModalDialogService, private _vcRef: ViewContainerRef) {

  }

  ngOnInit(): void {
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

    if (isIOS) {
      this.webview.nativeElement.ios.scrollView.bounces = false;
      this.webview.nativeElement.ios.scalesPageToFit = false;
      this.webview.nativeElement.ios.multipleTouchEnabled = false;
    }




    this.webview.nativeElement.on(WebView.loadFinishedEvent, () => {
      this.webViewInterface.emit('loadBook', 'rj.epub');
    });

    this.webViewInterface.on('chapters', (chapters => {
       this.chapters = chapters
       this.chapter.emit(this.chapters)
       //console.log(chapters)
    }))
  }

  setTocLoaded(){
    this.tocLoaded = true
  }

  nextPage() {
    console.log(this.chapters)
    this.tocLoaded = true
    this.webViewInterface.emit('nextPage', '');
  }

  prevPage() {
    this.tocLoaded = false

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
    this.webViewInterface.emit('viewMode', mode)
  }

  showToc(){
   
    const options: ModalDialogOptions = {
      viewContainerRef: this._vcRef,
      context: {
        data:this.chapters
      },
      fullscreen: false
  };

  this._modalService.showModal(TocComponent, options)
      .then((result: string) => {
         this.loadChapter(result)
      });

    
  //  this.router.navigate(['../toc'],navExtras)
  }




  loadChapter(chaperUrl){
    this.webViewInterface.emit('loadChapter',chaperUrl)
  }



}
