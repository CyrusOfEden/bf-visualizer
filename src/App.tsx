import React from "react"
import { ThemeProvider } from "emotion-theming"
import { Router } from "@reach/router"

import { createTheme } from "theme"

import { Box } from "rebass"
import Visualizer from "pages/Visualizer"
import NotFound from "pages/NotFound"

const App = () => {
  const theme = React.useMemo(createTheme, [])

  return (
    <ThemeProvider<any> theme={theme as any}>
      <Box
        as="main"
        sx={{
          width: "100%",
          p: [3, 5],
          mx: "auto",
        }}
      >
        <Router>
          <Visualizer path="/" />
          <NotFound default />
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
