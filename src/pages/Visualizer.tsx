import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "@reach/router"

import { useExecutor } from "services/brainfuckExecutor"

import { Text, Heading, Box, Button } from "rebass"

import CodeGrid from "components/CodeGrid"
import CodeForm from "components/CodeForm"

const Visualizer: React.FC<RouteComponentProps> = props => {
  const { setScript, isLoading, error, nextStep, state } = useExecutor()
  const [isPlaying, setPlaying] = useState(false)
  const [fastForward, setFastForward] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(nextStep, fastForward ? 100 : 300)
      return () => clearInterval(interval)
    }
  }, [nextStep, isPlaying, fastForward])

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
          {state.done && (
            <Box sx={{ my: 3 }}>
              <Heading>Output</Heading>
              <Text sx={{ color: "base02", fontWeight: "bold", my: 2 }}>
                {state.output}
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
                maxRows={12}
                activeColor="cyan"
                array={script}
                cursor={instruction_pointer}
              />
            </Box>
          </Box>
          <Button
            onClick={() => setPlaying(!isPlaying)}
            sx={{ mr: 2, bg: "cyan" }}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          {isPlaying ? (
            <Button onClick={() => setFastForward(!fastForward)} sx={{ mr: 2 }}>
              {fastForward ? "Slow Down" : "Fast Forward"}
            </Button>
          ) : (
            <Button onClick={nextStep} sx={{ mr: 2, bg: "magenta" }}>
              Step
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Visualizer
