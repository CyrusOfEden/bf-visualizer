import { useState, useEffect } from "react"
import axios from "axios"

export type InitialExecutionState = {
  input: string
  script: string
}

const emptyInitialExecutionState = {
  input: "",
  script: "",
}

export type ExecutionState = {
  id: string
  done: boolean
  instruction_pointer: number
  data_pointer: number
  input: string
  output: string
  script: Array<string>
  data: Array<number>
}

const emptyExecutionState = {
  id: "",
  done: false,
  instruction_pointer: 0,
  data_pointer: 0,
  input: "",
  output: "",
  script: [],
  data: [],
}

const url = (path = "") => `https://sec.meetkaruna.com/api/v1/brainfuck${path}`

export async function execute(
  script: InitialExecutionState,
): Promise<ExecutionState> {
  const { data } = await axios.post(url(), script)
  return data
}

export async function step(state: ExecutionState): Promise<ExecutionState> {
  const { id } = state
  const { data } = await axios.post(url(`/${id}/step`))
  return data
}

export function useExecutor(initialState = emptyInitialExecutionState) {
  const [isLoading, setLoading] = useState<boolean | null>(null)
  const [error, setError] = useState<Error | false>(false)
  const [state, setExecutionState] = useState<ExecutionState>(
    emptyExecutionState,
  )
  const [script, setScript] = useState(initialState)

  const setState = (newState: ExecutionState) => {
    setError(false)
    setExecutionState(newState)
    setLoading(false)
  }

  const firstStep = () => {
    if (script.script.trim()) {
      setLoading(true)
      execute(script).then(setState, setError)
    }
  }

  const nextStep = () => {
    if (!state.done) {
      setLoading(true)
      step(state).then(setState, setError)
    }
  }

  useEffect(firstStep, [script])

  return { setScript, isLoading, error, nextStep, state }
}
