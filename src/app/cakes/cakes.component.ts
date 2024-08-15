import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cake } from '../model/cake';
import { CakeService } from '../services/cake.service';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css'],
})
export class CakesComponent implements OnInit {
  cakes: Cake[] = [];
  ingredients: string[] = [];

  params = {
    sort: 'name',
    sortDirection: 'asc',
    filter: {
      ingredients: '',
    },
  };
  constructor(private service: CakeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getIngredients();
    this.getCakes();
  }
  getCakes(): void {
    this.route.params.subscribe((params: Params) => {
      this.service.getCakes(this.params).subscribe({
        next: (cakes: Cake[]) => {
          this.cakes = cakes;
        },
        error: (err: any) => {
          console.log('error: ', err);
        },
      });
    });
  }
  getIngredients() {
    this.service.getIngredients().subscribe({
      next: (ingredients: string[]) => {
        this.ingredients = ingredients;
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }
  onSortChanged(event: any) {
    this.params.filter.ingredients = event.target.value;
    this.getCakes();
  }
}
