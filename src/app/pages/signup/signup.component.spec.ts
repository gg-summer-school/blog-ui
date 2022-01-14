import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/pages/landing-page/landing-page.component.spec.ts
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ]
=======
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ]
>>>>>>> 757cc78594e1d4cefe88053a7c56563338de7929:src/app/pages/signup/signup.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/pages/landing-page/landing-page.component.spec.ts
    fixture = TestBed.createComponent(LandingPageComponent);
=======
    fixture = TestBed.createComponent(SignupComponent);
>>>>>>> 757cc78594e1d4cefe88053a7c56563338de7929:src/app/pages/signup/signup.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
