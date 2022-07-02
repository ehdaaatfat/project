import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-singlproduct',
  templateUrl: './singlproduct.component.html',
  styleUrls: ['./singlproduct.component.css']
})
export class SinglproductComponent implements OnInit {
  id:any
  singleProduct:any
  constructor(private activated:ActivatedRoute, private global:GlobalService) { 
    this.id = activated.snapshot.paramMap.get("productId")
    console.log(this.id)
    this.global.getSinglProduct(this.id).subscribe(data=>{
      console.log(data)
      this.singleProduct=data
    })
  }

  ngOnInit(): void {
  }

}
