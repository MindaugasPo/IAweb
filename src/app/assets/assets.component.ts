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
  searchAssetSubmitted = false;
  assetTypes: AssetType[] = this.getAssetTypes();

  newAsset = new FormGroup({
    title: new FormControl('', Validators.required),
    ticker: new FormControl('', Validators.required),
    assetType: new FormControl(null, Validators.required)
  });
  searchAsset = new FormGroup({
    searchString: new FormControl('', Validators.required)
  });

  constructor(
    private backend: BackendService
  ) {
  }

  ngOnInit(): void {
    this.backend.getAssets().subscribe(x => this.backendAssets = x);
  }

  submitSearchAsset(): void {
    this.searchAssetSubmitted = true;
    if(this.searchAsset.valid){
      this.backend
        .searchAsset(this.searchAsset.value.searchString)
        .subscribe(
          x => this.backendAssets = x,
          err => console.error('search asset error: ' + err),
          () => {
            this.newAssetSubmitted = false;}
        );
    }
  }

  submitNewAsset(): void {
    this.newAssetSubmitted = true;
    if (this.newAsset.valid){
      this.backend
        .createAsset(this.newAsset.value)
        .subscribe(
          x => this.backendAssets.push(x),
          err => console.error('submit new asset error: ' + err),
          () => {
            this.newAsset.reset();
            this.newAssetSubmitted = false;
          });
    }
  }

  get newf(){
    return this.newAsset.controls;
  }
  get searchf(){
    return this.searchAsset.controls;
  }

  getAssetTypes(): AssetType[]{
    // this method shouldn't be in this class
    return [
      { id: 1, name: "stock" },
      { id: 2, name: "bond" },
      { id: 3, name: "commodity" }
    ]
  }
  getAssetTypeName(id: number): string{
    return this.assetTypes.find(x => x.id == id)?.name ?? '';
  }
  deleteAsset(id: string){
    this.backend.deleteAsset(id).subscribe(
      () => {},
      err => console.error('delete asset error: ' + err),
      () => {
        let ind = this.backendAssets.findIndex(x => x.id == id);
        if (ind > -1){
          this.backendAssets.splice(ind, 1);
        }
      }
    );
  }
}
