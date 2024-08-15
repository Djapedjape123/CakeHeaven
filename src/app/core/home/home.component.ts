import { Component, OnInit } from '@angular/core';
import { SlideShow } from 'src/app/model/slideshow';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slides: SlideShow[] = [];
  constructor(private service: CakeService) {}

  ngOnInit(): void {
    this.getSlide();
  }

  getSlide(): void {
    this.service.getSlideShow().subscribe({
      next: (slideShow: SlideShow[]) => {
        this.slides = slideShow;
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }
}
