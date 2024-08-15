import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cake } from 'src/app/model/cake';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html',
  styleUrls: ['./cake-details.component.css'],
})
export class CakeDetailsComponent implements OnInit {
  cakeId: number = 0;
  cake: Cake = new Cake();
  constructor(private service: CakeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.cakeId = params['id'];
      this.getCakeDetails();
    });
  }

  getCakeDetails() {
    this.service.getCakeDetails(this.cakeId).subscribe({
      next: (response: Cake) => {
        this.cake = response;
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }
}
