import React, { useState, useEffect } from "react"
import { FixedSizeGrid as Grid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

import CodeCell, { CodeCellElement } from "./CodeCell"

// Sufficient to display 8-bit numbers
const CELL_HEIGHT = 48
const CELL_WIDTH = 50

type CodeGridProps = {
  cursor: number
  activeColor: string
  array: Array<CodeCellElement>
  maxRows: number
}

const CodeGrid: React.FC<CodeGridProps> = ({ maxRows, array, cursor, activeColor }) => {
  const [columns, setColumns] = useState(8)
  const ref = React.createRef<Grid>()

  useEffect(() => {
    const rowIndex = Math.floor(cursor / columns)
    const columnIndex = cursor - rowIndex * columns
    ref.current && ref.current.scrollToItem({ rowIndex, columnIndex })
  }, [ref, cursor, columns])

  const GridCell = ({ rowIndex, columnIndex, style }) => {
    const index = rowIndex * columns + columnIndex
    return (
      <CodeCell
        element={array[index]}
        isActive={index === cursor}
        activeColor={activeColor}
        style={style}
      />
    )
  }

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
            {GridCell}
          </Grid>
        )
      }}
    </AutoSizer>
  )
}

export default CodeGrid
