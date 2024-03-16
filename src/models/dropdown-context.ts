import { createContext } from '@lit/context'

export type DropdownContext = {
  activeItem: string | null
  setActiveItem: (itemId: string) => void
}

export const dropdownContext = createContext<DropdownContext>('dropdownContext')
