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
import { gcodeSelector, sendCommonWithPromise } from '../utils'
import { FRONT_PART_VERSION } from '@/version'

export default function Home() {
  const [gcode, setGcode] = useState(`>>-<<`)
  const [version, setVersion] = useState(`>>-<<`)
  const [isEnable, setIsEnable] = useState(`false`)
  const [domain, setDomain] = useState(`>>-<<`)
  const [sdkDetails, setSdkDetails] = useState(`>>-<<`)
  useEffect(() => {
    const msg = 'index.tsx 초기화면'
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)

    setGcode(ACS.getKey())
    setVersion(ACS.getSdkVersion())
    setIsEnable(ACS.isEnableSDK() ? 'true' : 'false')
    setDomain(ACS.getPackageNameOrBundleID() ?? '-')
    setSdkDetails(JSON.stringify(ACS.getSdkDetails(), null, 2))
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
            <Text fontSize="sm">GCODE: {gcode}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">AC SDK 버전: {version}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">AC SDK 활성화: {isEnable}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
            <Text fontSize="sm">AC SDK 전송 도메인: {domain}</Text>
          </Box>

          <Box display="flex" alignItems="baseline">
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
                  <pre>{sdkDetails}</pre>
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
