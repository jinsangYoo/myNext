import Link from 'next/link'
import {
  Box,
  Text,
  Avatar,
  Center,
  VStack,
  useColorModeValue,
  Badge
} from '@chakra-ui/react'
import * as U from '../../utils'

function MenuCard(props) {
  return (
    <Link href={`/menus/${props.path}`} passHref>
      <>
        <VStack
          spacing="4"
          borderRadius="md"
          boxShadow="xl"
          padding="5"
          backgroundColor={useColorModeValue('gray.50', 'gray.700')}
        >
          <Center>
            <Avatar size="lg" src={U.randomAvatarUrl(props.name)} />
          </Center>
          <Center>
            <Box textAlign="center">
              <Text fontWeight="bold" fontSize="xl">
                {props.name}
              </Text>
              {props.isDebug && <Badge colorScheme="teal">only debug</Badge>}
              {props.description && (
                <Text fontSize="xs">{props.description}</Text>
              )}
            </Box>
          </Center>
        </VStack>
      </>
    </Link>
  )
}

export default MenuCard
