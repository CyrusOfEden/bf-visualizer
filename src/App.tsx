import React from "react"
import { ThemeProvider } from "emotion-theming"
import { Router } from "@reach/router"

import { createTheme } from "theme"

import { Box } from "rebass"
import Executor from "pages/Executor"
import NotFound from "pages/NotFound"

const containerStyles = {
  width: "100%",
  p: [3, 5],
  mx: "auto",
}

const App = () => {
  const theme = React.useMemo(createTheme, [])

  return (
    <ThemeProvider<any> theme={theme as any}>
      <Box as="main" sx={containerStyles}>
        <Router>
          <Executor path="/" />
          <NotFound default />
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
