import React from "react"
import classnames from 'classnames';
import { Highlight, Snippet } from "react-instantsearch-dom"
import { navigate } from "gatsby"

export const PageHit = clickHandler => (props) => {
  return (
    <div role="button" onClick={() => navigate(props.hit.path)} className={classnames("px-3 py-2 Box-row Box-row--hover-blue")}>
      <h4>
        <Highlight attribute="title" hit={props.hit} tagName="mark" />
      </h4>
      <Snippet attribute="excerpt" hit={props.hit} tagName="mark" />
    </div>
  )
}
