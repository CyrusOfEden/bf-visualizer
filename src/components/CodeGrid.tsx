import React, { useState, useEffect } from "react"
import { FixedSizeGrid as Grid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import { Text } from "rebass"

type CodeCellElement = string | number

type CodeCellProps = {
  array: CodeCellElement[]
  cursor: number
  index: number
  activeColor: string
  style?: { [key: string]: string }
}

const CodeCell: React.FC<CodeCellProps> = ({
  cursor,
  index,
  array,
  style,
  activeColor,
  ...props
}) => {
  const isActive = cursor === index;
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
      {...props}
    >
      {array[index]}
    </Text>
  )
}

// Sufficient to display 8-bit numbers
const CELL_HEIGHT = 48
const CELL_WIDTH = 50

type CodeGridProps = {
  cursor: number
  activeColor: string
  array: Array<CodeCellElement>
  maxRows: number
}

const CodeGrid: React.FC<CodeGridProps> = ({
  maxRows,
  array,
  cursor,
  activeColor,
}) => {
  const [columns, setColumns] = useState(8)
  const ref = React.createRef<Grid>()

  useEffect(() => {
    const rowIndex = Math.floor(cursor / columns)
    const columnIndex = cursor - rowIndex * columns
    ref.current && ref.current.scrollToItem({ rowIndex, columnIndex })
  }, [ref, cursor, columns])

  return (
    <AutoSizer disableHeight>
      {({ width }) => {
        setColumns(Math.floor(width / CELL_WIDTH))
        const rows = Math.ceil(array.length / columns)
        return (
          <Grid
            ref={ref}
            rowCount={rows}
            columnCount={columns}
            rowHeight={CELL_HEIGHT}
            columnWidth={CELL_WIDTH}
            height={Math.min(rows, maxRows) * CELL_HEIGHT}
            width={width}
          >
            {({ rowIndex, columnIndex, style }) => (
              <CodeCell
                key={`${rowIndex}:${columnIndex}`}
                array={array}
                cursor={cursor}
                index={rowIndex * columns + columnIndex}
                activeColor={activeColor}
                style={style}
              />
            )}
          </Grid>
        )
      }}
    </AutoSizer>
  )
}

export default CodeGrid
