import { Box, Flex, Spacer, Heading, Text } from '@chakra-ui/react'
import { Stack, StackDivider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ButtonGroup, Button } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
import Head from 'next/head'

import BackButton from '@/components/BackButton'

import React, { useEffect } from 'react'
import { FC } from 'react'

import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus
} from '@jinsang/slimer-react'
import { getRandomIntInclusive, sendCommonWithPromise } from '@/utils'

const title = 'DeleteInCart'
const DeleteInCart: FC = () => {
  const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
  useEffect(() => {
    const msgForScreen = `>>${title}<< >>${randomValueForScreen}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <BackButton />
          <Spacer />
          <Heading>{`${title} >>${randomValueForScreen}<<`}</Heading>
        </Flex>

        <Card>
          <CardHeader>
            <Heading size="md">Client Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  멤버 ID:
                </Heading>
                <Editable defaultValue="Take some chakra">
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Overview
                </Heading>
                <Text pt="2" fontSize="sm">
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Analysis
                </Heading>
                <Text pt="2" fontSize="sm">
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="outline"
                colorScheme="blue"
                leftIcon={<AddIcon />}
              >
                Add
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                leftIcon={<DeleteIcon />}
              >
                Remove
              </Button>
              <Button variant="solid" colorScheme="blue">
                Buy now
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Delete to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </>
  )
}

export default DeleteInCart
