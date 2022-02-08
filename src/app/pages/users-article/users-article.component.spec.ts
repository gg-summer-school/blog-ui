import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersArticleComponent } from './users-article.component';

describe('UsersArticleComponent', () => {
  let component: UsersArticleComponent;
  let fixture: ComponentFixture<UsersArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
