import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

export default connectSearchBox(({ refine, onFocus }) => {
  return (
    <form>
      <input
        className="form-control input-dark ml-4"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        onFocus={onFocus}
      />
    </form>
  )
})
