import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  message = '';
  ngOnInit() {
    this.message = this.route.snapshot.params.message;
  }

}
