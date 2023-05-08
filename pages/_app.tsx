import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, Box } from '@chakra-ui/react'
import TopBar from '../components/TopBar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <TopBar />
      <Box maxWidth="container.xl" margin="auto">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
