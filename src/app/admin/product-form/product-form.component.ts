import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {
    title: null,
    price: null,
    category: null,
    imageUrl: null
  };
  id;
  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private rout: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

    this.id = this.rout.snapshot.paramMap.get('id');

    if (this.id) this.productService.get(this.id).take(1).subscribe(p => { this.product = p; });
  }
  save(product) {
    console.log(product);
    console.log("id" + this.id)
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product)
    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product.')) return;
    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);


  }


  ngOnInit() {
  }

}
