import { React } from 'jimu-core'
import type { AllWidgetSettingProps } from 'jimu-for-builder'
import { TextInput } from 'jimu-ui'
import type { IMConfig } from '../config'

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const onExampleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('exampleText', evt.target.value)
    })
  }

  return (
    <div className="m-2">
      <label htmlFor="assistant-heading">Example Text</label>
      <TextInput
        id="assistant-heading"
        className="w-100"
        value={props.config.exampleText}
        onChange={onExampleTextChange}
      />
    </div>
  )
}

export default Setting
