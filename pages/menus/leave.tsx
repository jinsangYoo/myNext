import { Box, Flex, Spacer, Heading, useToast } from '@chakra-ui/react'
import { Stack, StackDivider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ButtonGroup, Button } from '@chakra-ui/react'
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
import Head from 'next/head'

import BackButton from '@/components/BackButton'

import React, { useEffect, useState, useCallback } from 'react'
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

const title = 'Leave'
const Leave: FC = () => {
  const [randomValueForScreen, setRandomValueForScreen] = useState(0)
  const [pageHeading, setPageHeading] = useState<string>(`>>${title}<< >>-<<`)
  useEffect(() => {
    const ranValue = getRandomIntInclusive(0, 999)
    setRandomValueForScreen(ranValue)
    setPageHeading(`>>${title}<< >>${ranValue}<<`)
    const params = ACParams.init(
      ACParams.TYPE.EVENT,
      `>>${title}<< >>${ranValue}<<`
    )
    sendCommonWithPromise(`>>${title}<< >>${ranValue}<<`, params)
  }, [])

  const [randomValue, setRandomValue] = useState(0)
  useEffect(() => {
    setRandomValue(getRandomIntInclusive(0, 999))
  }, [])
  const [url, setUrl] = useState<string>('이벤트명 >>-<<')
  const [userId, setUserId] = useState<string>('유저ID >>-<<')
  useEffect(() => {
    setUrl(`이벤트명 >>${randomValue}<<`)
    setUserId(`유저ID >>${randomValue}<<`)
  }, [randomValue])

  const toast = useToast()
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.LEAVE, url)
    params.userId = userId
    sendCommonWithPromise(url, params)

    toast({
      title: '알림',
      description: params.userId ?? params.type,
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }, [url, userId])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <BackButton />
          <Spacer />
          <Heading p={8}>{pageHeading}</Heading>
        </Flex>

        <Card>
          <CardHeader>
            <Heading size="md">회원탈퇴 정보</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="1">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  이벤트명:
                </Heading>
                <Editable value={url} onChange={(newValue) => setUrl(newValue)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  탈퇴 유저 ID:
                </Heading>
                <Editable
                  value={userId}
                  onChange={(newValue) => setUserId(newValue)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
            </Stack>
          </CardBody>
          <CardFooter justify="space-between">
            <Spacer />
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue" onClick={onSend}>
                회원 탈퇴(Leave)
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </>
  )
}

export default Leave
