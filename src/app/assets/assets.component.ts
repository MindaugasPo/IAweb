import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { AssetDto, AssetType} from '../dto';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  AssetType = AssetType;
  assets: AssetDto[] = [];
  newAssetSubmitted = false;

  newAsset = new FormGroup({
    title: new FormControl('', Validators.required),
    ticker: new FormControl('', Validators.required),
    assetType: new FormControl('', Validators.required)
  });
  createCreated: Date = new Date;

  constructor(
    private backend: BackendService
  ) {
  }

  ngOnInit(): void {
    this.backend.getAssets().subscribe(x => this.assets = x);
  }

  createClick(): void {
    this.newAssetSubmitted = true;
    console.log("submitting...");
  }

  get f(){
    return this.newAsset.controls;
  }
}
