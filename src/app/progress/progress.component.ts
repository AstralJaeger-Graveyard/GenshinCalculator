import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  public currentState = 1;

  public upcomingFeatures = [
    {
      title: "Artifacts",
      description: "Why did it roll into DEF again?"
    },
    {
      title: "Schedule",
      description: "When did I have to grind that anoying domain again?"
    },
    {
      title: "Talents",
      description: "Never know who's material is due on what day? Fear no more!"
    },
    {
      title: "Dark mode",
      description: "Who dislikes light themes aswell?"
    },
    {
      title: "Signin",
      description: "Now you can signin!"
    },
    {
      title: "Premium",
      description: "A way to store things in the cloud! And support me through the app!"
    },
    {
      title: "Server Side Rendering",
      description: "Make everything a little faster!"
    },
    {
      title: "Enable PWA",
      description: "Optimize for mobile devices!"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
