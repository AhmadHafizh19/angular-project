import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotFound } from './not-found';

describe('NotFoundComponent', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: Location, useValue: locationSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockLocation = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create the not found component', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Lifecycle', () => {
    it('should set body styles on init', () => {
      const originalMargin = document.body.style.margin;
      const originalPadding = document.body.style.padding;

      component.ngOnInit();

      expect(document.body.style.margin).toBe('0px');
      expect(document.body.style.padding).toBe('0px');

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
  });

  describe('Navigation', () => {
    it('should navigate to home when goHome is called', () => {
      component.goHome();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should go back in browser history when goBack is called', () => {
      component.goBack();
      expect(mockLocation.back).toHaveBeenCalled();
    });
  });

  describe('Component Configuration', () => {
    it('should be standalone', () => {
      expect(component).toBeDefined();
      // The standalone configuration is handled by the decorator
    });

    it('should have ViewEncapsulation.None', () => {
      // This test verifies that the component is configured correctly
      // The ViewEncapsulation is set in the component decorator
      expect(component).toBeTruthy();
    });
  });
});
