import {
  Box,
  Flex,
  Spacer,
  Heading,
  Text,
  useToast,
  Center
} from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Stack, StackDivider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ButtonGroup, Button } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
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
import type { IProduct } from '../../data/types/iproduct-type'
import ProductCard from '../../components/ProductCard'
import { createRandomProduct } from '@/data/createRandomProduct'

const title = 'BuyCancel'
const BuyCancel: FC = () => {
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
  const [orderNum, setOrderNum] = useState<string>('주문번호 >>-<<')
  const [payMethod, setPayMethod] = useState<string>('지불방법 >>-<<')
  useEffect(() => {
    setUrl(`이벤트명 >>${randomValue}<<`)
    setMemberKey(`멤버ID >>${randomValue}<<`)
    setOrderNum(`주문번호 >>${randomValue}<<`)
    setPayMethod(`지불방법 >>${randomValue}<<`)
  }, [randomValue])

  // product
  const [products, setProducts] = useState<IProduct[]>([])
  const addProduct = useCallback(() => {
    setProducts((products) => [
      createRandomProduct(getRandomIntInclusive(0, 99)),
      ...products
    ])
  }, [])
  const deleteProduct = useCallback(
    (id: string) => () => {
      setProducts((products) => products.filter((p) => p.id !== id))
    },
    []
  )
  const updateProduct = useCallback((newProduct: IProduct) => {
    setProducts((products) =>
      products.map((p) => {
        if (p.id === newProduct.id) {
          return newProduct
        } else {
          return p
        }
      })
    )
  }, [])

  const allClearProducts = useCallback(() => {
    setProducts([])
  }, [])
  const toast = useToast()
  const onSend = useCallback(() => {
    if (products.length < 1) {
      toast({
        title: '알림',
        description: '제품을 추가해주세요',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
      return
    }

    const params = ACParams.init(ACParams.TYPE.BUY_CANCEL, url)
    params.memberKey = memberKey
    params.orderNumber = orderNum
    params.payMethodName = payMethod
    params.products = []
    products.map((item) => {
      params.products?.push(
        new ACProduct(
          item.name,
          item.category,
          item.price,
          item.quantity,
          item.productId,
          item.optionCodeName
        )
      )
    })
    sendCommonWithPromise(url, params)

    toast({
      title: '알림',
      description: params.memberKey ?? params.type,
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }, [url, products, memberKey, orderNum, payMethod])

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
            <Heading size="md">제품외 정보</Heading>
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
                  주문번호:
                </Heading>
                <Editable
                  value={orderNum}
                  onChange={(newValue) => setOrderNum(newValue)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  지불방법:
                </Heading>
                <Editable
                  value={payMethod}
                  onChange={(newValue) => setPayMethod(newValue)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
            </Stack>
          </CardBody>
          <CardFooter justify="space-between">
            <Center>
              <Text fontWeight="bold">제품 수량: {products.length} 개</Text>
            </Center>
            <ButtonGroup spacing="2">
              <Button
                variant="outline"
                colorScheme="blue"
                leftIcon={<AddIcon />}
                onClick={addProduct}
              >
                Add
              </Button>
              <Button
                variant="ghost"
                colorScheme="blue"
                leftIcon={<DeleteIcon />}
                onClick={allClearProducts}
              >
                All clear
              </Button>
              <Button variant="solid" colorScheme="blue" onClick={onSend}>
                구매취소
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Grid
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
          gridGap="10"
          padding="5"
        >
          {products.map((product) => (
            <GridItem key={product.id}>
              <ProductCard
                isDisableProductIdAndOptionCodeName={false}
                onUpdate={updateProduct}
                onRemove={deleteProduct(product.id)}
                {...product}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default BuyCancel
