export enum AssetType
{
    Stock = 1,
    Bond = 2,
    Commodity = 3
}
export interface AssetDto {
  id: string
  createdDateUtc: Date,
  title: string,
  ticker: string,
  assetType: AssetType
}
