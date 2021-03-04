import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { PortfolioDto } from '../dto';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio: PortfolioDto = {} as PortfolioDto;

  newPortfolio = new FormGroup({
    userId: new FormControl(''),
    title: new FormControl('', Validators.required)
  });

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
  }

  submitNewPortfolio(): void {
    this.newPortfolio.patchValue({
      userId:'dummy'
    });
    console.log(this.newPortfolio.value);
    this.backend
      .createPortfolio(this.newPortfolio.value)
      .subscribe(
        x => this.portfolio = x,
        err => console.error('submit new portfolio error: ' + err),
        () => this.newPortfolio.reset()
      );
  }
}
