import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
import TopBar from '../components/TopBar'

import React, { useEffect, useState } from 'react'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus
} from '@jinsang/slimer-react'
import { gcodeSelector } from '../utils'
import StatusForSDKContext from '../components/context/StatusForSDKContext'

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referer = context.req.headers['referer'] ?? 'empty'
  console.log(
    `_app::getServerSideProps::context.req.headers: ${JSON.stringify(
      context.req.headers,
      null,
      2
    )}`
  )
  console.log(`_app::getServerSideProps::referer: ${referer}`)

  return {
    props: {
      referer
    }
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [enable, setEnableInSDK] = useState(false)
  const [details, setDetailInSDK] = useState({})

  useEffect(() => {
    console.log(`_app::1. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
    console.log(`_app::1. ACS.getSdkVersion(): ${ACS.getSdkVersion()}`)

    const _config = AceConfiguration.init(gcodeSelector())
    ACS.configure(_config)
      .then((response) => {
        console.log('_app::SDK Promise 초기화::in then!!')
        console.log(`_app::2. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
        setEnableInSDK(ACS.isEnableSDK())
        setDetailInSDK(Object.assign(ACS.getSdkDetails()))
        console.log('_app::response: ' + JSON.stringify(response, null, 2))
        // setEnableInSDK(ACS.isEnableSDK())
        // setDetailInSDK(Object.assign(ACS.getSdkDetails()))
        // console.log(
        //   'ACS.getSdkVersion(): ' +
        //     JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2)
        // )
        // console.log(
        //   'ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2)
        // )
        // console.log('ACS.getKey(): ' + ACS.getKey())
      })
      .catch((err) => {
        console.log('_app::SDK Promise 초기화::in reject!!')
        console.log(err)
        // console.log('_app::err: ' + JSON.stringify(err, null, 2))
      })
  }, [])

  return (
    <ChakraProvider>
      <StatusForSDKContext.Provider
        value={{
          enable,
          setEnableInSDK,
          details,
          setDetailInSDK
        }}
      >
        <TopBar />
        <Box maxWidth="container.xl" margin="auto">
          <Component {...pageProps} />
        </Box>
      </StatusForSDKContext.Provider>
    </ChakraProvider>
  )
}
