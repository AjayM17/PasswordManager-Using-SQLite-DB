import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewEditItemPage } from './view-edit-item.page';

describe('ViewEditItemPage', () => {
  let component: ViewEditItemPage;
  let fixture: ComponentFixture<ViewEditItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEditItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
