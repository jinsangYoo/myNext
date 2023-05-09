import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
import TopBar from '../components/TopBar'

import React, { useEffect } from 'react'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus
} from '@jinsang/slimer-react'
import { gcodeSelector, sendCommonWithPromise } from '../utils'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const _config = AceConfiguration.init(gcodeSelector())
    ACS.configure(_config)
      .then((response) => {
        console.log('SDK Promise 초기화::in then!!')
        console.log('response: ' + JSON.stringify(response, null, 2))
        // setEnableInSDK(ACS.isEnableSDK())
        console.log(`1. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
        // setDetailInSDK(Object.assign(ACS.getSdkDetails()))
        console.log(
          'ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2)
        )
        console.log(
          'ACS.getSdkVersion(): ' +
            JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2)
        )
        console.log(
          'ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2)
        )
        console.log('ACS.getKey(): ' + ACS.getKey())
      })
      .catch((err) => {
        console.log('SDK Promise 초기화::in reject!!')
        console.log('err: ' + JSON.stringify(err, null, 2))
      })
  }, [])

  return (
    <ChakraProvider>
      <TopBar />
      <Box maxWidth="container.xl" margin="auto">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
