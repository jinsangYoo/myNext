import { Box, Heading, Text } from '@chakra-ui/react'
import { ButtonGroup, Button } from '@chakra-ui/react'
import {
  VStack,
  Flex,
  useColorModeValue,
  Spacer,
  StackDivider
} from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
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
import { FRONT_PART_VERSION } from '@/version'

export default function Home() {
  useEffect(() => {
    const msg = 'index.tsx 초기화면'
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const getSdkDetails = () => {}

  return (
    <Box>
      <Head>
        <title>Welcome to myNext website.</title>
      </Head>
      <Box>
        <Heading textAlign="center" marginTop="2">
          React SDK APIs
        </Heading>
        <VStack borderWidth="1px" alignItems="flex-start" spacing={1}>
          <Box display="flex" alignItems="baseline">
            <Badge colorScheme="teal">only debug</Badge>
            <Text fontSize="sm">: SDK 디버그 용도</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">웹사이트 버전: {FRONT_PART_VERSION}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">GCODE: {ACS.getKey()}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">AC SDK 버전: {ACS.getSdkVersion()}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">
              AC SDK 활성화: {ACS.isEnableSDK() ? 'true' : 'false'}
            </Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">
              AC SDK 전송 도메인: {ACS.getPackageNameOrBundleID()}
            </Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">AC SDK 현황:</Text>
            <Button colorScheme="teal" m={2} onClick={getSdkDetails}>
              ACS.getSdkDetails()
            </Button>
          </Box>
        </VStack>
        <Grid
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
          gridGap="5"
          padding="5"
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
