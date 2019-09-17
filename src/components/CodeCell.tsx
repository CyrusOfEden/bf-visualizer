import React from "react"
import { Text } from "rebass"

export type CodeCellElement = string | number

type CodeCellProps = {
  element: CodeCellElement
  isActive: boolean
  activeColor: string
  style?: { [key: string]: string }
}

const CodeCell: React.FC<CodeCellProps> = ({
  element,
  isActive,
  activeColor,
  style,
}) => {
  return (
    <Text
      sx={{
        fontSize: 2,
        py: 3,
        fontFamily: "monospace",
        textAlign: "center",
        color: isActive ? "white" : "base00",
        backgroundColor: isActive ? activeColor : "base3",
      }}
      style={style}
    >
      {element}
    </Text>
  )
}

export default CodeCell
