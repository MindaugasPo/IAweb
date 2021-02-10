export interface AssetType{
  id: number;
  name: string;
}
export interface AssetDto {
  id: string
  createdDateUtc: Date,
  title: string,
  ticker: string,
  assetType: number
}
