import preset from "@rebass/preset-material"
import deepmerge from "deepmerge"

// Solarized
const base03 = "#002b36"
const base02 = "#073642"
const base01 = "#586e75"
const base00 = "#657b83"
const base0 = "#839496"
const base1 = "#93a1a1"
const base2 = "#eee8d5"
const base3 = "#fdf6e3"
const yellow = "#b58900"
const orange = "#cb4b16"
const red = "#dc322f"
const magenta = "#d33682"
const violet = "#6c71c4"
const blue = "#268bd2"
const cyan = "#2aa198"
const green = "#859900"

const colors = {
  base03,
  base02,
  base01,
  base00,
  base0,
  base1,
  base2,
  base3,
  yellow,
  orange,
  red,
  magenta,
  violet,
  blue,
  cyan,
  green,
}

const buttons = {
  primary: {
    userSelect: "none",
    cursor: "pointer",
    backgroundColor: base00,
    "&:hover": {
      backgroundColor: base02,
    },
    "&:active": {
      backgroundColor: base00,
    },
    "&:focus": {
      outline: 0,
    },
    "&:disabled": {
      cursor: "not-allowed",
      backgroundColor: "base1"
    },
  },
}

export const theme = deepmerge(preset, {
  colors,
  buttons,
})

export const createTheme = () => theme
