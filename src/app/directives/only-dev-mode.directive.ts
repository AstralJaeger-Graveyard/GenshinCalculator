import {Directive, ElementRef, isDevMode, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[onlyDevMode]'
})
export class OnlyDevModeDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    if(isDevMode()){
      viewContainer.createEmbeddedView(templateRef);
    }else {
      viewContainer.clear();
    }
  }


}
