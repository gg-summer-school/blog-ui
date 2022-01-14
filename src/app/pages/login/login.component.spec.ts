import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/components/sidebar/sidebar.component.spec.ts
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
=======
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
>>>>>>> 757cc78594e1d4cefe88053a7c56563338de7929:src/app/pages/login/login.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/components/sidebar/sidebar.component.spec.ts
    fixture = TestBed.createComponent(SidebarComponent);
=======
    fixture = TestBed.createComponent(LoginComponent);
>>>>>>> 757cc78594e1d4cefe88053a7c56563338de7929:src/app/pages/login/login.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
