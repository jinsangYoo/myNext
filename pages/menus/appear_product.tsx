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

const title = 'AppearProduct'
const AppearProduct: FC = () => {
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
  const [memberKey, setMemberKey] = useState<string>('멤버ID >>-<<')
  const [productName, setProductName] = useState<string>('제품명 >>-<<')
  const [productCategory, setProductCategory] =
    useState<string>('제품카테 >>-<<')
  const [productPrice, setProductPrice] = useState<string>('제품 가격')
  const [productId, setProductId] = useState<string>('제품ID >>-<<')
  useEffect(() => {
    setUrl(`이벤트명 >>${randomValue}<<`)
    setMemberKey(`멤버ID >>${randomValue}<<`)
    setProductName(`제품명 >>${randomValue}<<`)
    setProductCategory(`제품카테 >>${randomValue}<<`)
    setProductPrice(`${randomValue}`)
    setProductId(`제품ID >>${randomValue}<<`)
  }, [randomValue])

  const toast = useToast()
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.APPEAR_PRODUCT, url)
    params.memberKey = memberKey
    params.productName = productName
    params.productCategoryName = productCategory
    params.productPrice = productPrice
    params.productId = productId
    sendCommonWithPromise(url, params)

    toast({
      title: '알림',
      description: params.memberKey ?? params.type,
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }, [memberKey, productName, productCategory, productPrice, productId])

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
            <Heading size="md">제품노출 정보</Heading>
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
                  멤버 ID:
                </Heading>
                <Editable
                  value={memberKey}
                  onChange={(newValue) => setMemberKey(newValue)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  제품명:
                </Heading>
                <Editable
                  value={productName}
                  onChange={(newValue) => setProductName(newValue)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  제품 카테고리:
                </Heading>
                <Editable
                  value={productCategory}
                  onChange={(newValue) => setProductCategory(newValue)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  제품 가격:
                </Heading>
                <Editable
                  value={productPrice}
                  onChange={(newValue) => setProductPrice(newValue)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  제품 ID:
                </Heading>
                <Editable
                  value={productId}
                  onChange={(newValue) => setProductId(newValue)}
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
                제품 노출
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Box>
    </>
  )
}

export default AppearProduct
