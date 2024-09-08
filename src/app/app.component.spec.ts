import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;

  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, myapp');
  // });

  it('Should render <router-outlet />', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('Should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );
    const divClasses = divElement?.classList.value.split(' ');

    expect(divElement).not.toBeNull();

    // divElement?.classList.forEach((className) => {
    //     expect(mustHaveClasses).toContain(className);
    // });

    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it("Should contain the 'buy me a beer' link", () => {
    const anchorElement = compiled.querySelector('a');

    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe('Buy me a beer');

    expect(anchorElement?.href).toBe('https://www.buymeacoffee.com/gerodrig');
    expect(anchorElement?.getAttribute('href')).toBe('https://www.buymeacoffee.com/gerodrig');

  });
});
