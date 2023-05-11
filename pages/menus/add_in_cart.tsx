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

const title = 'AddInCart'
const AddInCart: FC = () => {
  const [randomValueForScreen, setRandomValueForScreen] = useState(0)
  useEffect(() => {
    const ranValue = getRandomIntInclusive(0, 999)
    setRandomValueForScreen(ranValue)
    const msgForScreen = `>>${title}<< >>${ranValue}<<`
    const params = ACParams.init(ACParams.TYPE.EVENT, msgForScreen)
    sendCommonWithPromise(msgForScreen, params)
  }, [])
  const randomValue = getRandomIntInclusive(0, 999)
  const [url, setUrl] = useState<string>(`>>${title}<< >>${randomValue}<<`)
  const [memberKey, setMemberKey] = useState<string>(
    `멤버ID >>${randomValue + 0}<<`
  )
  // product
  const [products, setProducts] = useState<IProduct[]>([])
  const addProduct = useCallback(() => {
    const randomValue = getRandomIntInclusive(0, 99)
    setProducts((products) => [createRandomProduct(randomValue), ...products])
  }, [])
  const deleteProduct = useCallback(
    (id: string) => () => {
      setProducts((products) => products.filter((p) => p.id !== id))
    },
    []
  )
  const allClearProducts = useCallback(() => {
    setProducts([])
  }, [])
  const toast = useToast()
  const onSend = useCallback(() => {
    const params = ACParams.init(ACParams.TYPE.ADDCART)
    params.memberKey = memberKey
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
  }, [products, memberKey])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <BackButton />
          <Spacer />
          <Heading p={8}>{`${title} >>${randomValueForScreen}<<`}</Heading>
        </Flex>

        <Card>
          <CardHeader>
            <Heading size="md">제품외 정보</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  멤버 ID:
                </Heading>
                <Editable
                  defaultValue={memberKey}
                  onChange={(newValue) => setMemberKey(newValue)}
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
                Add to cart
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

export default AddInCart
