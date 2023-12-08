export type Data = IData[]

interface IData {
  id: number
  title: string
  startYear: number
  endYear: number
  info: Info[]
}

interface Info {
  year: number
  text: string
}