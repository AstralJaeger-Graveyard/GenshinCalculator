import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

/**
 * How to use this directive?
 * Taken from: https://gist.github.com/davidmarquis/80e6d1ada3a024022f985a587b587825
 * ```
 * <div *ngIfMediaQuery="'(min-width: 500px)'">
 *     Div element will exist only when media query matches, and created/destroyed when the viewport size changes.
 * </div>
 * ```
 */
@Directive({
  selector: '[appMedia]'
})
export class MediaDirective {

  private previousCondition: boolean = null;

  private mql: MediaQueryList;

  // Reference for cleaning up on ngOnDestroy()
  private mqlListener: (mql: MediaQueryList) => any;

  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<Object>)
  { }

  @Input('appMedia')
  set appMedia(newMediaQuery: string){
    if(!this.mql){
      this.mql = window.matchMedia(newMediaQuery);

      // Register for future events
      this.mqlListener = (mq) => {
        this.onMediaMatchChange(mq.matches);
      }
      // this.mql.addListener(this.mqlListener);
      // @ts-ignore
      this.mql.addEventListener('change', this.mqlListener);
    }
    this.onMediaMatchChange(this.mql.matches);
  }

  ngOnDestroy(){
    // this.mql.removeListener(this.mqlListener);
    // @ts-ignore
    this.mql.removeEventListener('change', this.mqlListener);
    this.mql = this.mqlListener = null;
  }

  private onMediaMatchChange(matches: boolean){
    // this has been taken verbatim from NgIf implementation
    if (matches && (this.isBlank(this.previousCondition) || !this.previousCondition)){
      this.previousCondition = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else if (!matches && (this.isBlank(this.previousCondition) || this.previousCondition)){
      this.previousCondition = false;
      this.viewContainer.clear();
    }
  }

  private isBlank(object: any): boolean{
    return !!object;
  }
}
