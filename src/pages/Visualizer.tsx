import React from "react"
import { RouteComponentProps } from "@reach/router"

import { useExecutor } from "services/brainfuckExecutor"

import { Heading, Box } from "rebass"

import Tape from "components/Tape"
import CodeForm from "components/CodeForm"

const Visualizer: React.FC<RouteComponentProps> = props => {
  const { setScript, isLoading, isError, nextStep, state } = useExecutor()
  const { data, data_pointer } = state
  const { script, instruction_pointer } = state

  const DataTape = <Tape array={data} cursor={data_pointer} />
  const ScriptTape = <Tape array={script} cursor={instruction_pointer} />

  return (
    <>
      {DataTape}
      {ScriptTape}
      <Box sx={{ maxWidth: 600 }}>
        <CodeForm onSubmit={(values, _) => setScript(values)} />
      </Box>
    </>
  )
}

export default Visualizer
