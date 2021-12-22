import {isReferenceSchemaType, Marker, Path, SchemaType} from '@sanity/types'
import React, {ForwardedRef, forwardRef, useMemo} from 'react'
import {FormFieldPresence} from '@sanity/base/presence'
import {FormBuilderInput} from '../../../../FormBuilderInput'
import {ArrayMember, InsertEvent, ReferenceItemComponentType} from '../types'
import PatchEvent from '../../../../PatchEvent'
import {Props as InputProps} from '../../../types'

type Props = {
  type: SchemaType
  value: ArrayMember
  compareValue?: ArrayMember[]
  onInsert: (event: InsertEvent) => void
  markers: Marker[]
  onChange: (event: PatchEvent) => void
  onFocus: (path: Path) => void
  ReferenceItemComponent: ReferenceItemComponentType
  onBlur: () => void
  filterField: () => any
  isSortable: boolean
  readOnly: boolean | null
  focusPath: Path
  presence: FormFieldPresence[]
}

export const ItemForm = forwardRef(function ItemForm(props: Props, ref: ForwardedRef<any>) {
  const {
    type,
    value,
    markers,
    focusPath,
    onFocus,
    onBlur,
    onChange,
    ReferenceItemComponent,
    readOnly,
    isSortable,
    filterField,
    presence,
    onInsert,
    compareValue,
  } = props

  const isReference = isReferenceSchemaType(type)

  const Input = useMemo(
    () =>
      isReference
        ? forwardRef(function Input_(
            givenProps: InputProps,
            inputRef: ForwardedRef<{focus: () => void}>
          ) {
            return (
              <ReferenceItemComponent
                {...givenProps}
                onInsert={onInsert}
                isSortable={isSortable}
                onChange={props.onChange}
                ref={inputRef}
              />
            )
          })
        : undefined,
    [ReferenceItemComponent, isReference, isSortable, props.onChange]
  )

  return (
    <FormBuilderInput
      type={type}
      level={0}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      inputComponent={Input}
      compareValue={compareValue}
      focusPath={focusPath}
      readOnly={readOnly || type.readOnly || false}
      markers={markers}
      path={[{_key: value._key}]}
      filterField={filterField}
      presence={presence}
      ref={ref}
    />
  )
})
