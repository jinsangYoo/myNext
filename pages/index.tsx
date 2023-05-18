import { Box, Code, Heading, Text } from '@chakra-ui/react'
import { ButtonGroup, Button } from '@chakra-ui/react'
import {
  VStack,
  Flex,
  useColorModeValue,
  Spacer,
  StackDivider
} from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import Head from 'next/head'
import { menus } from '../data/menus'
import MenuCard from '../components/MenuCard'

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
import { FRONT_PART_VERSION } from '@/version'
import { IconButton } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import StatusForSDKContext from '@/components/context/StatusForSDKContext'

export default function Home() {
  const { enable, details } = useContext(StatusForSDKContext)
  const [domain, setDomain] = useState('-')
  useEffect(() => {
    const msg = 'index.tsx 초기화면'
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    ACS.send(params)
      .then((response) => {
        console.log(`Home::${msg}::in then!!`)
        if (response) {
          console.log('Home::response: ' + JSON.stringify(response, null, 2))
        } else {
          console.log('Home::response is undefined.')
        }
      })
      .catch((err) => {
        console.log(`Home::${msg}::in reject!!`)
        if (err) {
          console.log('Home::err: ' + JSON.stringify(err, null, 2))
        } else {
          console.log('Home::err is undefined.')
        }
      })

    setDomain(ACS.getPackageNameOrBundleID() ?? '-')
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Head>
        <title>Welcome to myNext website.</title>
      </Head>
      <Box>
        <Heading textAlign="center" marginTop="1">
          React SDK APIs
        </Heading>
        <VStack borderWidth="1px" alignItems="flex-start" spacing={1} p={2}>
          <Box display="flex" alignItems="baseline">
            <Badge colorScheme="teal">only debug</Badge>
            <Text fontSize="sm">: SDK 디버그 용도</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">웹사이트 버전: {FRONT_PART_VERSION}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">
              설명: reactjs + nextjs 기반 웹사이트에서 AC react SDK 테스트를
              위한 웹사이트
            </Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">GCODE: {ACS.getKey() ?? '-'}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">AC SDK 버전: {ACS.getSdkVersion() ?? '-'}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">
              AC SDK 활성화: {enable ? 'true' : 'false'}
            </Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">AC SDK 전송 도메인: {domain}</Text>
          </Box>

          <Box display="flex" alignItems="center">
            <Text fontSize="sm">AC SDK 현황:</Text>
            <Button colorScheme="teal" m={2} onClick={onOpen}>
              ACS.getSdkDetails()
            </Button>

            <Modal
              blockScrollOnMount={false}
              isOpen={isOpen}
              onClose={onClose}
              size="xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>SDK 상세정보</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <pre>{JSON.stringify(details, null, 2)}</pre>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        </VStack>
        <Grid
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
          gridGap="4"
          padding="4"
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
