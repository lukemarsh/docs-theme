import React, { useState, useEffect, createRef } from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import {navigate} from 'gatsby'
import algoliasearch from "algoliasearch/lite"
import Downshift from 'downshift'

import Input from "./input"
import * as hitComps from "./hitComps"

import "./Search.scss";

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : (<div className="px-3 py-2 Box-row">No results for '{state.query}'</div>)
)

function stateReducer(state, changes) {
  switch (changes.type) {
    case Downshift.stateChangeTypes.changeInput:
      if (!changes.inputValue) {
        // Close the menu if the input is empty.
        return {...changes, isOpen: false}
      }
      return changes
    default:
      return changes
  }
}

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
}

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside(ref, () => setFocus(false))
  return (
    <div ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Downshift
          inputValue={query}
          onInputValueChange={inputValue => setQuery(inputValue)}
          // We don't need Downshift to keep track of a selected item because as
          // soon as an item is selected we navigate to a new page.
          // Let's avoid any unexpected states related to the selected item
          // by setting it to always be `null`.
          selectedItem={null}
          onSelect={item => {
            if (item) {
              navigate(item.path)
              setQuery('')
            }
          }}
          itemToString={item => (item ? item.title : '')}
          stateReducer={stateReducer}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            getRootProps,
            isOpen,
            highlightedIndex,
          }) => {
            return (
              <div className="position-relative">
                <Input onFocus={() => setFocus(true)} />
                { query.length > 0 && focus && (
                  <div className="position-absolute left-0 right-0 pt-2">
                    <div className="HitsWrapper box-shadow-medium Box bg-white py-1">
                      {indices.map(({ name, title, hitComp }) => (
                        <Index key={name} indexName={name}>
                          <Results>
                            <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
                          </Results>
                        </Index>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          }}
        </Downshift>
      </InstantSearch>
    </div>
  )
}
