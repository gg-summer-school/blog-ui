import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherAdminComponent } from './publisher-admin.component';

describe('AdminComponent', () => {
  let component: PublisherAdminComponent;
  let fixture: ComponentFixture<PublisherAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
