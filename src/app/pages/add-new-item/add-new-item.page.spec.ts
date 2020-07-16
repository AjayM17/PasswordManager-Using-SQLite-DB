import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewItemPage } from './add-new-item.page';

describe('AddNewItemPage', () => {
  let component: AddNewItemPage;
  let fixture: ComponentFixture<AddNewItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
