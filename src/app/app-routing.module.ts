import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { EpubComponent } from "./epub/epub.component";
import { TocComponent } from "./toc/toc.component";

const routes: Routes = [
    { path: "", redirectTo: "/epub", pathMatch: "full" },
    { path: "epub", component: EpubComponent },
    { path: "toc", component: TocComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
