import { appActions, getAppStore, MutableStoreManager, React, type AllWidgetProps } from 'jimu-core'
import { Button, TextInput } from 'jimu-ui'
import { useEffect, useRef, useState } from 'react'
// shared code imports
import type { StorePropParams } from 'widgets/shared-code/entry_dts'

const Widget = (props: AllWidgetProps<unknown>) => {

  const [listenWidget, setListenWidget] = useState({} as any)
  const message = useRef<string>('This is my demo text for the listenStoreProps widget.')

  // Search for the listenStoreProps widget in the app configuration.
  // Use the first one for communication.
  useEffect(() => {
    const widgets = getAppStore().getState().appConfig.widgets
    const listenWidgets = Object.values(widgets).filter(
      (w: any) => w.uri === 'widgets/listenStoreProps/'
    )
    if (listenWidgets.length > 0) {
      setListenWidget(listenWidgets[0])
    }
  }, [])

  const sendData = () => {
    // use appAction widgetStatePropChange and AppStore to send the data to the listenStoreProps widget
    getAppStore().dispatch(appActions.widgetStatePropChange(
        listenWidget.id,
        'sampleText',
        message.current
      ))

    // Alternative: Use MutableStoreManager for complex objects.
    MutableStoreManager.getInstance().updateStateValue(
      listenWidget.id,
      'complexParams',
      { name: 'complexParams', value: message.current, id: 123 } as StorePropParams
    )
    console.log(getAppStore().getState())
  }

  if (!listenWidget) {
      return <div className='m-2'>
        This widget shows how to use stateProps to communicate with another widget.
        <br />
        Please add a listenStoreProps widget to the experience.
      </div>
  }
    return <div className='widget-listen-store-props'>
      <div className='m-2'>
        This widget shows how to use stateProps to communicate with another widget.
      </div>
      <TextInput
        className="m-4"
        placeholder="This is my demo text for the listenStoreProps widget."
        onAcceptValue={(value) => { message.current = value }}
      />
      <Button className="m-4" onClick={sendData}>Send Data</Button>
    </div>

}

export default Widget
