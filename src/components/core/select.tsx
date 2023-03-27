import * as RadixSelect from '@radix-ui/react-select'
import { memo } from 'react'
import { ChevronDown } from 'react-feather'

type Props = {
  defaultItem?: Item
  items: Item[]
  onChange?: (value: string) => void
}

type Item = {
  label?: string
  value: string
}

const Select = ({ defaultItem, items, onChange }: Props) => {
  return (
    <RadixSelect.Root onValueChange={onChange}>
      <RadixSelect.Trigger className="bg-indigo-600 w-max p-2 rounded uppercase font-bold mt-2 flex gap-2">
        <RadixSelect.Value
          defaultValue={defaultItem?.value}
          placeholder={defaultItem?.label}
        />
        <RadixSelect.Icon>
          <ChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className="bg-neutral-800 overflow-hidden p-2 rounded font-bold absolute top-auto">
          <RadixSelect.Viewport>
            {items.map((item, key) => {
              return (
                <RadixSelect.Item
                  value={item.value}
                  key={key}
                  className="relative select-none data-[disabled]:text-neutral-500 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-indigo-600 p-2 rounded w-full"
                >
                  <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              )
            })}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] cursor-default">
            <ChevronDown />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

export default memo(Select)
