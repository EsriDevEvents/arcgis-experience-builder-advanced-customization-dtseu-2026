import { React, type AllWidgetProps } from 'jimu-core'
import { useEffect, useState } from 'react'
// shared code imports
import type { StorePropParams } from 'widgets/shared-code/entry_dts'

const Widget = (props: AllWidgetProps<unknown>) => {

  const [textFromOtherWidget, setTextFromOtherWidget] = useState<string>()
  const [objectFromOtherWidget, setObjectFromOtherWidget] = useState<string>()

  // Use stateProps to listen to changes of parameter 'sampleText' in the store.
  useEffect(() => {
    if (props?.stateProps?.sampleText) {
      setTextFromOtherWidget(props?.stateProps?.sampleText)
    }
  }, [props?.stateProps?.sampleText])

  // Alternative: Use mutableStateProps for complex objects.
  useEffect(() => {
    if (props?.mutableStateProps?.complexParams) {
      const params = props?.mutableStateProps?.complexParams as StorePropParams
      setObjectFromOtherWidget(JSON.stringify(params))
    }
  }, [props?.mutableStateProps?.complexParams])

  if (!textFromOtherWidget) {
      return <div className='m-2'>
        This widget shows how to use stateProps to communicate with another widget.
        <br />
        <br />
        Please send data.
      </div>
  }
    return <div className='widget-listen-store-props'>
      <div className='m-2'>
        This widget shows how to use stateProps to communicate with another widget.
      </div>
      <div className='m-4'>
        {textFromOtherWidget}
      </div>
      <div className='m-4'>
        {objectFromOtherWidget}
      </div>
    </div>

}

export default Widget
