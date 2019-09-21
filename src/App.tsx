import React from "react"
import { ThemeProvider } from "emotion-theming"

import { createTheme } from "theme"

import { Box } from "rebass"
import Visualizer from "pages/Visualizer"

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
        <Visualizer />
      </Box>
    </ThemeProvider>
  )
}

export default App
