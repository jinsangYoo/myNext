import Link from 'next/link'
import { Box, Button } from '@chakra-ui/react'

import React, { FC } from 'react'

const BackButton: FC = () => {
  return (
    <Box maxW="container.xl" margin="auto" padding="8">
      <Link href="/" passHref>
        <Button colorScheme="whatsapp">Back</Button>
      </Link>
    </Box>
  )
}

export default BackButton
