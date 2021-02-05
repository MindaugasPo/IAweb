import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { AssetDto, AssetType} from '../dto';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  assets: AssetDto[];
  AssetType = AssetType;

  constructor(
    private backend: BackendService
  ) {
    this.assets = [];
  }

  ngOnInit(): void {
    this.backend.getAssets().subscribe(x => this.assets = x);
  }

}