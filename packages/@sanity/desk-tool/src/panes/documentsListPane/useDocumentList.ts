// @todo: remove the following line when part imports has been removed from this file
///<reference types="@sanity/types/parts" />

import {VirtualListChangeOpts} from '@sanity/ui'
import {getQueryResults} from 'part:@sanity/base/query-container'
import {useEffect, useState, useCallback, useMemo, useRef} from 'react'
import {of} from 'rxjs'
import {filter as filterEvents} from 'rxjs/operators'
import {DocumentsListPaneItem, QueryResult, SortOrder, SortOrderBy} from './types'
import {removePublishedWithDrafts, toOrderClause} from './helpers'
import {DEFAULT_ORDERING, FULL_LIST_LIMIT, PARTIAL_PAGE_LIMIT} from './constants'

interface UseDocumentListOpts {
  defaultOrdering: SortOrderBy[]
  filter: string
  params: Record<string, unknown>
  sortOrder?: SortOrder
}

interface DocumentListState {
  error: {message: string} | null
  fullList: boolean
  handleListChange: ({toIndex}: VirtualListChangeOpts) => void
  isLoading: boolean
  items: DocumentsListPaneItem[] | null
  onRetry?: (event: unknown) => void
}

/**
 * @internal
 */
export function useDocumentList(opts: UseDocumentListOpts): DocumentListState {
  const {defaultOrdering, filter, params, sortOrder} = opts
  const [fullList, setFullList] = useState(false)
  const fullListRef = useRef(fullList)
  const [result, setResult] = useState<QueryResult | null>(null)
  const error = result?.error || null
  const isLoading = result?.loading || result === null
  const onRetry = result?.onRetry
  const documents = result?.result?.documents
  const items = useMemo(() => (documents ? removePublishedWithDrafts(documents) : null), [
    documents,
  ])

  const query = useMemo(() => {
    const extendedProjection = sortOrder?.extendedProjection
    const projectionFields = ['_id', '_type']
    const finalProjection = projectionFields.join(',')
    const sortBy = sortOrder?.by || defaultOrdering || []
    const limit = fullList ? FULL_LIST_LIMIT : PARTIAL_PAGE_LIMIT
    const sort = sortBy.length > 0 ? sortBy : DEFAULT_ORDERING.by
    const order = toOrderClause(sort)

    if (extendedProjection) {
      const firstProjection = projectionFields.concat(extendedProjection).join(',')

      // At first glance, you might think that 'order' should come before 'slice'?
      // However, this is actually a counter-bug
      // to https://github.com/sanity-io/gradient/issues/922 which causes:
      // 1. case-insensitive ordering (we want this)
      // 2. null-values to sort to the top, even when order is desc (we don't want this)
      // Because Studios in the wild rely on the buggy nature of this
      // do not change this until we have API versioning
      return [
        `*[${filter}] [0...${limit}]`,
        `{${firstProjection}}`,
        `order(${order})`,
        `{${finalProjection}}`,
      ].join('|')
    }

    return `*[${filter}]|order(${order})[0...${limit}]{${finalProjection}}`
  }, [defaultOrdering, filter, fullList, sortOrder])

  const handleListChange = useCallback(
    ({toIndex}: VirtualListChangeOpts) => {
      if (isLoading || fullListRef.current) {
        return
      }

      if (toIndex >= PARTIAL_PAGE_LIMIT / 2) {
        setFullList(true)

        // Prevent change handler from firing again before setState kicks in
        fullListRef.current = true
      }
    },
    [isLoading]
  )

  // Set up the document listener
  useEffect(() => {
    setResult(null)

    // @todo: explain what this does
    const filterFn = fullList
      ? (queryResult: {result: QueryResult | null}) => Boolean(queryResult.result)
      : () => true

    const queryResults$ = getQueryResults(of({query, params}), {tag: 'desk.document-list'}).pipe(
      filterEvents(filterFn)
    )

    const sub = queryResults$.subscribe(setResult)

    return () => sub.unsubscribe()
  }, [fullList, query, params])

  // If the `filter`/`params` has changed, set up a new query from scratch
  // If `sortOrder` changed, set up a new query from scratch as well
  useEffect(() => {
    setResult(null)
    setFullList(false)
    fullListRef.current = false
  }, [filter, params, sortOrder])

  return {error, fullList, handleListChange, isLoading, items, onRetry}
}