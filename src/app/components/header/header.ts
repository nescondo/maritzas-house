import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements AfterViewInit{
  // Child reference to the 'nav' element in template
  @ViewChild('nav', { static: false }) navRef!: ElementRef; // { static: false } for the scenario where this reference does not exist on initialization
  activeRoute: string = '';

  // Default styling for div binding
  underlineStyle = { 
    width: '0px', 
    transform: 'translateX(0px)' 
  };
  
  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    // Listens for all router events and changes current route upon navigation end
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
        // Ensures DOM is fully rendered before modifying
        setTimeout(() => {
          this.updateUnderlinePosition();
        });
      }
    });
  }
  
  // Runs immediately after DOM is rendered (for navRef)
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateUnderlinePosition();
    });
  }
  
  updateUnderlinePosition(): void {
    if (!this.navRef) return;
    
    // Finds all elements with 'button' selector
    const buttons = this.navRef.nativeElement.querySelectorAll('button');
    const activeIndex = this.getActiveIndex();
    const activeButton = buttons[activeIndex];
    
    if (activeButton) {
      this.underlineStyle = {
        width: activeButton.offsetWidth + 'px', // Width of button
        transform: `translateX(${activeButton.offsetLeft}px)` // How far button is from left edge (beginning of x-axis) - remember template literals require backticks (`)
      };
      // Manually trigger change detection to update
      this.cdr.detectChanges();
    }
  }
  
  getActiveIndex(): number {
    switch(this.activeRoute) {
      case '/': return 0;
      case '/aboutus': return 1;
      case '/contactinfo': return 2;
      default: return 0;
    }
  }
}
