import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products=[]
  constructor(private global:GlobalService) {
    this.global.getproducts().subscribe(data=>{
      this.products=data
    })
  }

  ngOnInit(): void {
  }

}
