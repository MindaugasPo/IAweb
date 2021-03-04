export interface AssetType{
  id: number;
  name: string;
}
export interface AssetDto {
  id: string,
  title: string,
  ticker: string,
  assetType: number
}

export interface PortfolioDto {
  userId: string,
  title: string
}
