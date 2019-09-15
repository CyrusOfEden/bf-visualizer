import preset from "@rebass/preset"
import deepmerge from "deepmerge"

export const theme = {}

export const createTheme = () => deepmerge(preset, theme)
