import { Box, Grid, Text, GridItem } from '@chakra-ui/react'
import Head from 'next/head'
import { menus } from '../data/menus'
import MenuCard from '../components/MenuCard'

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
    const msg = 'index.tsx 초기화면'
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  return (
    <Box>
      <Head>
        <title>Welcome to myNext website.</title>
      </Head>
      <Box>
        <Text
          fontSize="xxx-large"
          fontWeight="extrabold"
          textAlign="center"
          marginTop="9"
        >
          React SDK APIs
        </Text>
        <Grid
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
          gridGap="10"
          padding="10"
        >
          {menus.menus.map((menu) => (
            <GridItem key={menu.id}>
              <MenuCard {...menu} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
