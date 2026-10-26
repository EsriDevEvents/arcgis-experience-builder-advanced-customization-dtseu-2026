import { React } from 'jimu-core'
import type { AllWidgetSettingProps } from 'jimu-for-builder'
import { TextInput } from 'jimu-ui'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import type { IMConfig } from '../config'

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    props.onSettingChange({ id: props.id, useMapWidgetIds })
  }

  const onAssistantHeadingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('assistantHeading', evt.target.value)
    })
  }
  return (
    <div className="m-2">
      <div className="m-2">
        <label>Map widget</label>
        <MapWidgetSelector
          onSelect={onMapWidgetSelected}
          useMapWidgetIds={props.useMapWidgetIds}>
        </MapWidgetSelector>
      </div>
      <div className="m-2">
        <label htmlFor="assistant-heading">Assistant heading</label>
        <TextInput
          id="assistant-heading"
          className="w-100"
          value={props.config.assistantHeading}
          onChange={onAssistantHeadingChange}
        />
      </div>
    </div>
  )
}

export default Setting