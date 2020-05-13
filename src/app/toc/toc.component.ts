import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.css']
})
export class TocComponent implements OnInit {
  chapters;

  public constructor(private params: ModalDialogParams) {
    // this.route.queryParams.subscribe(params => {
    //   this.chapters = JSON.parse(params['data'])

    // });
  }

  ngOnInit(): void {
    // this.chapters = JSON.parse(this.params as any)
    this.chapters = this.params.context.data
    console.log(this.params.context.data)
  }

  showChapter(href){
      this.params.closeCallback(href);
  }

}
