import { Box, Button, useColorMode, Flex, Text, Spacer } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function TopBar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const ColorModeIcon = colorMode === 'light' ? SunIcon : MoonIcon

  return (
    <Box width="100%" padding="1" backgroundColor="whatsapp.500">
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2" maxWidth="container.xl" margin="auto">
          <Button
            aria-label="UI Theme"
            leftIcon={<ColorModeIcon />}
            onClick={toggleColorMode}
            size="xs"
            marginRight="2"
            borderRadius="sm"
          >
            Toggle theme
          </Button>
        </Box>
        <Spacer />
        <Box p="2" maxWidth="container.xl" margin="auto">
          <Text>
            reactjs + nextjs 기반 웹사이트에서 AC react SDK 테스트를 위한
            웹사이트
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default TopBar
