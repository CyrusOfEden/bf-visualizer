import React, { useState, useEffect } from "react"

import { Button, Box } from "rebass"
import { Label } from "@rebass/forms"
import AutosizeTextarea from "react-textarea-autosize"
import { InitialExecutionState } from "services/brainfuckExecutor"

import { theme } from "theme"

const helloWorld =
  "# Hello World\n++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++."

const Textarea: React.FC<any> = props => (
  <AutosizeTextarea
    id="script"
    minRows={1}
    maxRows={12}
    style={{
      resize: "none",
      width: "100%",
      boxSizing: "border-box",
      // @ts-ignore
      fontSize: theme.fontSizes[2],
      lineHeight: 1.5,
      // @ts-ignore
      padding: theme.space[3],
      // @ts-ignore
      fontFamily: theme.fonts.monospace,
      outline: 0,
      border: 0,
      color: theme.colors.base02,
      backgroundColor: theme.colors.base2,
      borderRadius: "0.2rem",
    }}
    {...props}
  />
)

type CodeFormProps = {
  onSubmit: (values: InitialExecutionState) => void
}

const CodeForm: React.FC<CodeFormProps> = ({ onSubmit }) => {
  const [script, setScript] = useState<string>(helloWorld)
  const [input, setInput] = useState<string>("")

  useEffect(() => {
    onSubmit({ script, input })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit({ script, input })
  }

  const setValue = setter => event => {
    setter(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ my: 3 }}>
        <Label htmlFor="script" sx={{ mb: 2, color: "base1" }}>
          Source
        </Label>
        <Textarea
          name="script"
          value={script}
          onChange={setValue(setScript)}
          placeholder="Enter your Brianfuck script here..."
        />
      </Box>
      {/* <Box sx={{ my: 3 }}>
        <Label htmlFor="input" sx={{ mb: 2, color: "base1" }}>
          Input
        </Label>
        <Textarea
          name="input"
          value={input}
          onChange={setValue(setInput)}
          placeholder="STDIN (optional)"
        />
      </Box> */}
      <Button type="submit" sx={{ bg: "violet" }}>
        Reload Visualizer
      </Button>
    </form>
  )
}

export default CodeForm
