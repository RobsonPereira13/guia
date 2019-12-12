import { AuthService } from './../../services/auth.service';
import { StarReviewService } from './../../services/star-review.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss'],
})
export class StarReviewComponent implements OnInit {
 
  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(
    private starService: StarReviewService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.stars = this.starService.getGuiaStars(this.authService.getAuth().currentUser.uid)

    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    })
  }

}