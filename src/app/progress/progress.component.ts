import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  public currentState = 0;

  public upcomingFeatures = [
    {
      title: "Schedule",
      description: "When did I have to grind that anoying domain again?"
    },
    {
      title: "Artifacts",
      description: "Why did it roll into DEF again?"
    },
    {
      title: "Dark mode",
      description: "Who dislikes light themes aswell?"
    },
    {
      title: "Signin",
      description: "A way to store things in the cloud!"
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
