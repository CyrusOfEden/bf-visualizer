import React from "react"
import { Flex, Box } from "rebass"

type CellElement = string | number

type CellProps = {
  element: CellElement
  isActive: boolean
}

const Cell: React.FC<CellProps> = ({ element, isActive }) => (
  <Box sx={{ bg: isActive ? "papayawhip" : "transparent" }}>{element}</Box>
)

type TapeProps = {
  cursor: number
  array: Array<CellElement>
}

const Tape: React.FC<TapeProps> = ({ array, cursor }) => (
  <Flex>
    {array.map((element, index) => (
      <Cell element={element} isActive={index === cursor} />
    ))}
  </Flex>
)

export default Tape
