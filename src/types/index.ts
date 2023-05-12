export interface IProduct {
  id: number
  factory_id: number
  date: string | null
  product1: number | null
  product2: number | null
  product3: number
}

export interface IGraphData {
  label: string
  backgroundColor: string
  data: number[]
}

export interface IDetailsParams {
  factoryId: string
  monthNumber: string
  [key: string]: string
}

export interface IGraphDetail {
  label: string
  backgroundColor: string[]
  data: number[]
}
