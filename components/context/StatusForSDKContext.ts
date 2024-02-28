import { createContext } from 'react'

interface IStatusForSDK {
  enable: boolean
  setEnableInSDK: (argEnable: boolean) => void
  details: any
  setDetailInSDK: (argDetailOfSDK: any) => void
}

const StatusForSDKContext = createContext({} as IStatusForSDK)

export default StatusForSDKContext
