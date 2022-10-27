export type NumberOrStringType = number | string

export interface AppInfoType {
  id: string
  category: string
  name: string
  image: string
  summary: string
  artist: string
  rate: number
  comments: number
}

export type AppInfoListType = Array<AppInfoType>

export class infoLabelType {
  label: string;
  [propName: string]: any
}

export interface infoAttrType {
  attributes: {
    [propName: string]: string
  }
}

export interface infoFullType extends infoLabelType, infoAttrType {}

export interface originalAppInfoBase {
  category: infoAttrType
  id: infoFullType
  'im:artist': infoFullType
  'im:contentType': infoAttrType
  'im:image': Array<infoFullType>
  'im:name': infoLabelType
  'im:price': infoFullType
  'im:releaseDate': infoFullType
  link: Array<infoAttrType>
  rights: infoLabelType
  summary: infoLabelType
}

export interface originalAppInfoOther {
  averageUserRating: number
  userRatingCount: number
}
