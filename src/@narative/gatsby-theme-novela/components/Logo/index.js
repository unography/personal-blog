import React from "react"

/**
 * Paste in your SVG logo and return it from this component.
 * Make sure you have a height set for your logo.
 * It is recommended to keep the height within 25-35px.
 */
export default function Logo() {
  return (
    <svg viewBox="0 0 100 100" height="30px">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="5"
        fill-opacity="0"
        // style="fill-opacity: .0;stroke-opacity: .25"
      />
    </svg>
  )
}
