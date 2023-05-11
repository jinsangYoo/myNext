import { Text, useColorModeValue, Tooltip, Button } from '@chakra-ui/react'
import { Stack, StackDivider } from '@chakra-ui/react'
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

function ProductCard(props) {
  return (
    <>
      <Stack
        spacing="2"
        borderRadius="md"
        boxShadow="xl"
        padding="3"
        backgroundColor={useColorModeValue('gray.50', 'gray.700')}
      >
        <Stack
          spacing="2"
          borderRadius="sd"
          boxShadow="2xl"
          padding="2"
          direction="row"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Tooltip label="제품명" aria-label="A tooltip">
            <Editable
              defaultValue={props.name}
              fontWeight="bold"
              onChange={(nextValue) => {
                props.onUpdate({
                  id: props.id,
                  name: nextValue,
                  category: props.category,
                  price: props.price,
                  quantity: props.quantity,
                  productId: props.productId,
                  optionCodeName: props.optionCodeName
                })
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Tooltip>
          <Tooltip label="제품 카테고리" aria-label="A tooltip">
            <Editable defaultValue={props.category} fontWeight="bold">
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Tooltip>
          <Tooltip label="제품 가격" aria-label="A tooltip">
            <Editable defaultValue={props.price} fontWeight="bold">
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Tooltip>
        </Stack>
        <Stack
          spacing="2"
          borderRadius="sd"
          boxShadow="2xl"
          padding="2"
          direction="row"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Tooltip label="제품 수량" aria-label="A tooltip">
            <Editable defaultValue={props.quantity} fontWeight="bold">
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Tooltip>

          <Tooltip
            label={
              props.isDisableProductIdAndOptionCodeName === true
                ? '제품ID - 비활성'
                : '제품ID'
            }
            aria-label="A tooltip"
          >
            {props.isDisableProductIdAndOptionCodeName === true ? (
              <Text>비활성</Text>
            ) : (
              <Editable defaultValue={props.productId} fontWeight="bold">
                <EditablePreview />
                <EditableInput />
              </Editable>
            )}
          </Tooltip>

          <Tooltip
            label={
              props.isDisableProductIdAndOptionCodeName === true
                ? '옵션코드 - 비활성'
                : '옵션코드'
            }
            aria-label="A tooltip"
          >
            {props.isDisableProductIdAndOptionCodeName === true ? (
              <Text>비활성</Text>
            ) : (
              <Editable defaultValue={props.optionCodeName} fontWeight="bold">
                <EditablePreview />
                <EditableInput />
              </Editable>
            )}
          </Tooltip>

          <Button
            variant="outline"
            colorScheme="blue"
            leftIcon={<DeleteIcon />}
            onClick={props.onRemove}
          >
            Remove
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export default ProductCard
