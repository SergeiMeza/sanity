// @todo: remove the following line when part imports has been removed from this file
///<reference types="@sanity/types/parts" />

import React, {useMemo} from 'react'
import CustomMarkers from 'part:@sanity/form-builder/input/block-editor/block-markers-custom-default'
import {Marker, isValidationMarker} from '@sanity/types'
import {Box, Flex, Stack, Text} from '@sanity/ui'
import {InfoOutlineIcon} from '@sanity/icons'
import {RenderCustomMarkers} from '../types'

type Props = {
  markers: Marker[]
  renderCustomMarkers?: RenderCustomMarkers
}
export default function Markers(props: Props) {
  const {markers, renderCustomMarkers} = props

  const customMarkersForBlock = useMemo(
    () => markers.filter((marker) => !isValidationMarker(marker)),
    [markers]
  )
  const validationMarkersForBlock = useMemo(
    () => markers.filter((marker) => isValidationMarker(marker)),
    [markers]
  )
  if (markers.length === 0) {
    return null
  }
  return (
    <Stack>
      {validationMarkersForBlock.length > 0 &&
        validationMarkersForBlock.map(({item}, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={`validationItem-${index}`}>
            <Box marginRight={2}>
              <Text size={1} accent>
                <InfoOutlineIcon />
              </Text>
            </Box>
            <Box>
              <Text size={1}>{item?.message || 'Error'}</Text>
            </Box>
          </Flex>
        ))}
      {customMarkersForBlock.length > 0 && (
        <Stack>
          <Box marginTop={validationMarkersForBlock.length > 0 ? 3 : 0}>
            {renderCustomMarkers && renderCustomMarkers(customMarkersForBlock)}
            {!renderCustomMarkers && <CustomMarkers markers={markers} />}
          </Box>
        </Stack>
      )}
    </Stack>
  )
}