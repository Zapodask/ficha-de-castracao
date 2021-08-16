import { createContext, ReactNode, useState } from 'react'
import { ThemeProvider as SCThemeProvider, DefaultTheme } from 'styled-components'

import Light from '@/styles/themes/light'
import Dark from '@/styles/themes/dark'

interface ThemeContextData {
    theme: any
    toggleTheme: () => void
}

interface Props {
    children: ReactNode
}

export const ThemeContext = createContext({} as ThemeContextData)

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<DefaultTheme>(Dark)

  function toggleTheme () {
    setTheme(theme.title === 'light' ? Dark : Light)
  }

  return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <SCThemeProvider theme={theme}>
                {children}
            </SCThemeProvider>
        </ThemeContext.Provider>
  )
}
