import { CommentsComponent } from './components/comments/comments.component';
import { StarReviewComponent } from './components/star-review/star-review.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,

  ],
  declarations: [StarReviewComponent,CommentsComponent],
  exports:[StarReviewComponent,CommentsComponent]
})
export class ShareModule {}