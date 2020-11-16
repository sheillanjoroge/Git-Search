import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective {

  @HostListener("click") onClicks(){
    this.textUnderline()
  }
  constructor(private elem: ElementRef) { 
    
  }

  textUnderline(){
    this.elem.nativeElement.style.textDecoration = 'underline'
  }
}