import React, { useState } from "react"

import { Button, Box } from "rebass"
import Form from "@rebass/form"
import AutosizeTextarea from "react-textarea-autosize"

const helloWorld =
  "+[-[<<[+[--->]-[<<<]]]>>>-]>-.---.>..>.<<<<-.<+.>>>>>.>.<<.<-."

const Textarea: React.FC<any> = props => (
  <AutosizeTextarea
    id="script"
    minRows={1}
    maxRows={12}
    style={{
      resize: "none",
      width: "100%",
      boxSizing: "border-box",
      fontSize: "1rem",
      lineHeight: 1.5,
      padding: "1rem",
      fontFamily: "monospace",
      outline: 0,
      border: 0,
      color: "#002b36",
      backgroundColor: "#fdf6e3",
    }}
    {...props}
  />
)

type CodeFormProps = {
  onSubmit: (values, formData) => void
}

const CodeForm: React.FC<CodeFormProps> = props => {
  const [values, setValues] = useState({ script: helloWorld, input: "" })

  return (
    <Form
      values={values}
      handleSubmit={props.onSubmit}
      render={({ values, touched, onSubmit }) => (
        <form onSubmit={onSubmit}>
          <Box sx={{ py: 3 }}>
            <Textarea
              value={values.script}
              onChange={setValues}
              placeholder="Enter your Brianfuck script here..."
            />
          </Box>
          <Button type="submit">Execute</Button>
        </form>
      )}
    />
  )
}

export default CodeForm
