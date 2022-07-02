import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMyproductComponent } from './cart-myproduct.component';

describe('CartMyproductComponent', () => {
  let component: CartMyproductComponent;
  let fixture: ComponentFixture<CartMyproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartMyproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartMyproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
