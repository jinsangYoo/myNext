import { Box, Flex, Spacer, Heading, useToast } from '@chakra-ui/react'
import { Stack, StackDivider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ButtonGroup, Button } from '@chakra-ui/react'
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
import Head from 'next/head'
import { Radio, RadioGroup } from '@chakra-ui/react'

import BackButton from '@/components/BackButton'

import { stringToNumber } from '@/utils'

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

const title = 'LoginForAPI'
const LoginForAPI: FC = () => {
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
  const [userAge, setUserAge] = useState(0)
  const [genderRadioGroupIndex, setGenderRadioGroupIndex] = useState('1')
  const [maritalStatusRadioGroupIndex, setMaritalStatusRadioGroupIndex] =
    useState('1')
  useEffect(() => {
    setUrl(`이벤트명 >>${randomValue}<<`)
    setUserId(`유저ID >>${randomValue}<<`)
    setUserAge(randomValue)
    if (randomValue % 3 === 0) {
      setGenderRadioGroupIndex('2')
    } else if (randomValue % 7 === 0) {
      setGenderRadioGroupIndex('3')
    } else {
      setGenderRadioGroupIndex('1')
    }

    if (randomValue % 5 === 0) {
      setMaritalStatusRadioGroupIndex('2')
    } else if (randomValue % 2 === 0) {
      setMaritalStatusRadioGroupIndex('3')
    } else {
      setMaritalStatusRadioGroupIndex('1')
    }
  }, [randomValue])

  const toast = useToast()
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.LOGIN, url)
    params.userId = userId
    params.userAge = userAge
    params.userGender =
      genderRadioGroupIndex === '1'
        ? ACEGender.Unknown
        : genderRadioGroupIndex === '2'
        ? ACEGender.Man
        : ACEGender.Woman
    params.userMaritalStatus =
      maritalStatusRadioGroupIndex === '1'
        ? ACEMaritalStatus.Unknown
        : maritalStatusRadioGroupIndex === '2'
        ? ACEMaritalStatus.Single
        : ACEMaritalStatus.Married
    sendCommonWithPromise(url, params)

    toast({
      title: '알림',
      description: params.userId ?? params.type,
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }, [
    url,
    userId,
    userAge,
    genderRadioGroupIndex,
    maritalStatusRadioGroupIndex
  ])

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
            <Heading size="md">로그인 정보</Heading>
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
                  로그인 유저 ID:
                </Heading>
                <Editable
                  value={userId}
                  onChange={(newValue) => setUserId(newValue)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  나이:
                </Heading>
                <Editable
                  value={userAge + ''}
                  onChange={(newValue) =>
                    setUserAge(stringToNumber(newValue, 0))
                  }
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  성별:
                </Heading>
                <RadioGroup
                  onChange={setGenderRadioGroupIndex}
                  value={genderRadioGroupIndex}
                >
                  <Stack direction="row" spacing={5}>
                    <Radio value="1">알수없음</Radio>
                    <Radio value="2">{ACEGender.Man}</Radio>
                    <Radio value="3">{ACEGender.Woman}</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  결혼여부:
                </Heading>
                <RadioGroup
                  onChange={setMaritalStatusRadioGroupIndex}
                  value={maritalStatusRadioGroupIndex}
                >
                  <Stack direction="row" spacing={5}>
                    <Radio value="1">알수없음</Radio>
                    <Radio value="2">{ACEMaritalStatus.Single}</Radio>
                    <Radio value="3">{ACEMaritalStatus.Married}</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Stack>
          </CardBody>
          <CardFooter justify="space-between">
            <Spacer />
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue" onClick={onSend}>
                로그인(Login)
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </>
  )
}

export default LoginForAPI
