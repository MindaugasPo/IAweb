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
  backendAssets: AssetDto[] = [];
  newAssetSubmitted = false;
  assetTypes: AssetType[] = this.getAssetTypes();

  newAsset = new FormGroup({
    title: new FormControl('', Validators.required),
    ticker: new FormControl('', Validators.required),
    assetType: new FormControl(null, Validators.required)
  });
  createCreated: Date = new Date;

  constructor(
    private backend: BackendService
  ) {
  }

  ngOnInit(): void {
    this.backend.getAssets().subscribe(x => this.backendAssets = x);
  }

  createClick(): void {
    this.newAssetSubmitted = true;
    console.log("form:");
    console.log(this.newAsset.value);
  }

  get f(){
    return this.newAsset.controls;
  }

  getAssetTypes(): AssetType[]{
    // this method shouldn't be in this class
    return [
      { id: 1, name: "stock" },
      { id: 2, name: "bond" },
      { id: 3, name: "commodity" }
    ]
  }
}
