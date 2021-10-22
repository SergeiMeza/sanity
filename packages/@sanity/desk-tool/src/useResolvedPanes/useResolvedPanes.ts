import {RouterContext} from '@sanity/base/router'
import {useEffect, useState, useContext} from 'react'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {LOADING_PANE} from '../constants'
import {RouterPanes, PaneNode, RouterPaneGroup} from '../types'
import {createResolvedPaneNodeStream} from './createResolvedPaneNodeStream'
import {loadStructure} from './helpers'

interface PaneData {
  active: boolean
  childItemId: string | null
  groupIndex: number
  index: number
  itemId: string
  key: string
  pane: PaneNode | typeof LOADING_PANE
  params: Record<string, string | undefined>
  path: string
  payload: unknown
  selected: boolean
  siblingIndex: number
}

interface Panes {
  paneData: PaneData[]
  routerPanes: RouterPanes
  resolvedPanes: (PaneNode | typeof LOADING_PANE)[]
}

export function useResolvedPanes(): Panes {
  const router = useContext(RouterContext)
  const [data, setData] = useState<Panes>({
    paneData: [],
    resolvedPanes: [],
    routerPanes: [],
  })

  // used to propagate errors from async effect. throwing inside of the render
  // will bubble the error to react where it can be picked up by standard error
  // boundaries
  const [error, setError] = useState<unknown>()
  if (error) throw error

  useEffect(() => {
    const routerPanes$ = new Observable<Record<string, unknown>>((observer) => {
      // emit state initial flow
      observer.next(router.getState())

      const unsubscribe = router.channel.subscribe(() => observer.next(router.getState()))
      return unsubscribe
    }).pipe(map((routerState) => (routerState?.panes || []) as RouterPanes))

    const subscription = createResolvedPaneNodeStream({
      rootPaneNode: loadStructure(),
      routerPanesStream: routerPanes$,
    })
      .pipe(
        map((resolvedPanes) => {
          const routerPanes = resolvedPanes.reduce<RouterPanes>((acc, next) => {
            const currentGroup = acc[next.groupIndex] || []
            currentGroup[next.siblingIndex] = next.routerPaneSibling
            acc[next.groupIndex] = currentGroup
            return acc
          }, [])

          const groupsLen = routerPanes.length

          const paneData = resolvedPanes.map((pane) => {
            const {groupIndex, flatIndex, siblingIndex, routerPaneSibling, path} = pane
            const itemId = routerPaneSibling.id
            const nextGroup = routerPanes[groupIndex + 1] as RouterPaneGroup | undefined

            const paneDataItem: PaneData = {
              active: groupIndex === groupsLen - 2,
              childItemId: nextGroup?.[0].id ?? null,
              index: flatIndex,
              itemId: routerPaneSibling.id,
              groupIndex,
              key: `${
                pane.type === 'loading' ? 'unknown' : pane.paneNode.id
              }-${itemId}-${siblingIndex}`,
              pane: pane.type === 'loading' ? LOADING_PANE : pane.paneNode,
              params: routerPaneSibling.params as Record<string, string>,
              path: path.join(';'),
              payload: routerPaneSibling.payload,
              selected: flatIndex === resolvedPanes.length - 1,
              siblingIndex,
            }

            return paneDataItem
          })

          return {
            paneData,
            routerPanes,
            resolvedPanes: paneData.map((pane) => pane.pane),
          }
        })
      )
      .subscribe({
        next: (result) => setData(result),
        error: (e) => setError(e),
      })

    return () => subscription.unsubscribe()
  }, [router])

  return data
}
