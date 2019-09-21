import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "@reach/router"

import { useExecutor } from "services/brainfuckExecutor"

import { Text, Heading, Box, Button } from "rebass"

import CodeGrid from "components/CodeGrid"
import CodeForm from "components/CodeForm"

const Visualizer: React.FC<RouteComponentProps> = props => {
  const { setScript, isLoading, error, nextStep, state } = useExecutor()
  const [isPlaying, setPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      nextStep()
    }
  }, [isPlaying, nextStep, state])

  const { data, data_pointer } = state
  const { script, instruction_pointer } = state

  return (
    <Box sx={{ color: "base01" }}>
      <Box>
        <Heading>Brainfuck Execution Visualizer</Heading>
        <CodeForm onSubmit={setScript} />
      </Box>
      {isLoading == null || (
        <Box sx={{ mt: 5 }}>
          {error && (
            <Box sx={{ p: 3, color: "white", bg: "red" }}>
              <Text>
                {error.error} — {error.message}
              </Text>
            </Box>
          )}

          <Box sx={{ my: 3 }}>
            <Heading>Data</Heading>
            <Box sx={{ my: 2 }}>
              <CodeGrid
                maxRows={3}
                activeColor="magenta"
                array={data}
                cursor={data_pointer}
              />
            </Box>
          </Box>
          <Box sx={{ my: 3 }}>
            <Heading>Script</Heading>
            <Box sx={{ my: 2 }}>
              <CodeGrid
                maxRows={6}
                activeColor="cyan"
                array={script}
                cursor={instruction_pointer}
              />
            </Box>
          </Box>
          {state.done && state.output && (
            <Box sx={{ mt: 3, my: 4 }}>
              <Heading sx={{ mb: 2 }}>Output</Heading>
              <Text sx={{ color: "base02", fontWeight: "bold" }}>
                {state.output}
              </Text>
            </Box>
          )}
          <Box>
            <Button
              onClick={nextStep}
              sx={{ mr: 2, bg: "cyan" }}
              disabled={isPlaying}
            >
              Step
            </Button>
            <Button
              onClick={() => setPlaying(!isPlaying)}
              sx={{ mr: 2, bg: "magenta" }}
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Visualizer
