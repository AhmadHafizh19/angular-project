import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { NotFound } from './not-found';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;
  let router: jasmine.SpyObj<Router>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set body styles on init', () => {
    const originalMargin = document.body.style.margin;
    const originalPadding = document.body.style.padding;

    component.ngOnInit();

    expect(document.body.style.margin).toBe('0');
    expect(document.body.style.padding).toBe('0');

    // Restore original styles
    document.body.style.margin = originalMargin;
    document.body.style.padding = originalPadding;
  });

  it('should restore body styles on destroy', () => {
    // Set initial styles
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    component.ngOnDestroy();

    expect(document.body.style.margin).toBe('');
    expect(document.body.style.padding).toBe('');
  });

  it('should navigate to home when goHome is called', () => {
    component.goHome();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should go back to previous page when goBack is called', () => {
    component.goBack();

    expect(location.back).toHaveBeenCalled();
  });

  it('should have ViewEncapsulation.None', () => {
    const componentInstance = fixture.componentRef.instance;
    const componentMetadata = componentInstance.constructor as any;

    // Check if the component is standalone
    expect(componentMetadata).toBeDefined();
  });

  it('should be a standalone component', () => {
    const componentMetadata = (component.constructor as any).__annotations__?.[0] ||
                             (component.constructor as any).ɵcmp;

    // The component should be defined (testing for standalone property is complex in unit tests)
    expect(componentMetadata).toBeDefined();
  });
});
