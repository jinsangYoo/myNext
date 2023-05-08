import { Box, Grid, Text, GridItem } from '@chakra-ui/react'
import Head from 'next/head'
import { menus } from '../data/menus'
import SubPageCard from '../components/SubPageCard'

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

export default function Home() {
  useEffect(() => {
    const _config = AceConfiguration.init(gcodeSelector())
    ACS.configure(_config)
      .then((response) => {
        console.log('SDK Promise 초기화::in then!!')
        console.log('response: ' + JSON.stringify(response, null, 2))
        // setEnableInSDK(ACS.isEnableSDK())
        console.log(`1. ACS.isEnableSDK(): ${ACS.isEnableSDK()}`)
        // setDetailInSDK(Object.assign(ACS.getSdkDetails()))
        console.log('ACS.getDetail(): ' + JSON.stringify(ACS.getSdkDetails(), null, 2))
        console.log('ACS.getSdkVersion(): ' + JSON.stringify(JSON.parse(ACS.getSdkVersion()), null, 2))
        console.log('ACS.getTS(): ' + JSON.stringify(JSON.parse(ACS.getTS()), null, 2))
        console.log('ACS.getKey(): ' + ACS.getKey())

        const msg = 'index.tsx 초기화면'
        const params = ACParams.init(ACParams.TYPE.EVENT, msg)
        sendCommonWithPromise(msg, params)
      })
      .catch((err) => {
        console.log('SDK Promise 초기화::in reject!!')
        console.log('err: ' + JSON.stringify(err, null, 2))
      })
  }, [])

  return (
    <Box>
      <Head>
        <title>Welcome to myNext website</title>
      </Head>
      <Box>
        <Text fontSize="xxx-large" fontWeight="extrabold" textAlign="center" marginTop="9">
          API별 메뉴
        </Text>
        <Grid gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gridGap="10" padding="10">
          {menus.menus.map((menu) => (
            <GridItem key={menu.id}>
              <SubPageCard {...menu} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
