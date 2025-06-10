import { type Component, shallowRef, type MaybeRef, nextTick } from "vue"

export const enum ContextMenuItemVariant {
  Child = "child",
  Separator = "separator",
  Header = "header",
  Button = "button",
}

export type ContextMenuItemSeparator = {
  type: ContextMenuItemVariant.Separator
}

export type ContextMenuItemHeader = {
  type: ContextMenuItemVariant.Header,
  label: string,
}

export type ContextMenuItemButton = {
  type: ContextMenuItemVariant.Button,
  label: string,
  checkbox?: MaybeRef<boolean>,
  icon?: Component,
  disabled?: boolean
  action?: () => void,
}

export type ContextMenuItemChild = {
  type: ContextMenuItemVariant.Child
  label: string,
  icon?: Component,
  disabled?: boolean,
  items: () => ContextMenuItem[]
}


export type ContextMenuItem =
  ContextMenuItemSeparator |
  ContextMenuItemButton |
  ContextMenuItemChild |
  ContextMenuItemHeader

export type ContextMenuOptions = {
  x: number,
  y: number,
  closeOnAction?: boolean,
  actionOnPointerUp?: boolean,
  minWidth?: number,
}

export type ContextMenu = {
  options: ContextMenuOptions,
  items: ContextMenuItem[],
  id: number
}

const defaultOptions: Partial<ContextMenuOptions> = {
  closeOnAction: true,
  actionOnPointerUp: true,
}

export const currentContextMenu = shallowRef<ContextMenu | null>(null)

export function closeContextMenu() {
  currentContextMenu.value = null
}

let id = 0
export function createContextMenu(options: ContextMenuOptions, items: ContextMenuItem[]) {

  const optionsWithDefaults: ContextMenuOptions = {
    ...defaultOptions,
    ...options,
  }
  currentContextMenu.value = { options: optionsWithDefaults, items, id: id++ }

  return () => currentContextMenu.value = null
}

/* Example 

import { useCheckbox, useSwitcher } from "./composition"

const checkbox = useCheckbox(false)
const option = useSwitcher(['a', 'b', 'c'] as const, 'a')

function items(): ContextMenuItem[] {
  return [
    { type: ContextMenuItemVariant.Button, label: 'Button', disabled: true },
    { type: ContextMenuItemVariant.Separator },
    { type: ContextMenuItemVariant.Header, label: 'Header' },
    { type: ContextMenuItemVariant.Button, label: 'Button', checkbox: checkbox.value, action: checkbox.toggle },
    {
      type: ContextMenuItemVariant.Child,
      label: 'test',
      items: items
    },
    { type: ContextMenuItemVariant.Separator },
    { type: ContextMenuItemVariant.Button, label: 'A', checkbox: option.a, action: () => option.setActive('a') },
    { type: ContextMenuItemVariant.Button, label: 'B', checkbox: option.b, action: () => option.setActive('b') },
    { type: ContextMenuItemVariant.Button, label: 'C', checkbox: option.c, action: () => option.setActive('c') },
    { type: ContextMenuItemVariant.Separator },
  ]
}

setTimeout(() => {
  const close = createContextMenu({ x: 512, y: 512 }, items())
})

*/
