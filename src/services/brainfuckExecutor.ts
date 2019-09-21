import { useState, useEffect, useCallback } from "react"
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

export type ExecutionError = {
  error: string,
  message: string
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

const interpreter = axios.create({
  baseURL: "https://sec.meetkaruna.com/api/v1/brainfuck",
  validateStatus: statusCode => statusCode < 500
})

const processResponse = ({ status, data }) =>
  (status >= 200 && status <= 300) ? Promise.resolve(data) : Promise.reject(data)

export async function execute(
  script: InitialExecutionState,
): Promise<ExecutionState> {
  return processResponse(await interpreter.post("", script))
}

export async function step(state: ExecutionState): Promise<ExecutionState> {
  const { id } = state
  return processResponse(await interpreter.post(`/${id}/step`))
}

export function useExecutor(initialState = emptyInitialExecutionState) {
  const [isLoading, setLoading] = useState<boolean | null>(null)
  const [error, setError] = useState<ExecutionError | null>(null)
  const [state, setExecutionState] = useState<ExecutionState>(
    emptyExecutionState,
  )
  const [script, setScript] = useState(initialState)

  const setState = (newState: ExecutionState) => {
    setError(null)
    setExecutionState(newState)
    setLoading(false)
  }

  const firstStep = () => {
    if (script.script.trim()) {
      setLoading(true)
      execute(script).then(setState, setError)
    }
  }

  // useCallback to serialize the execution of multiple calls
  const nextStep = useCallback(() => {
    setLoading(true)
    return step(state).then(setState, setError)
  }, [state])

  useEffect(firstStep, [script])

  return { setScript, isLoading, error, nextStep, state }
}
