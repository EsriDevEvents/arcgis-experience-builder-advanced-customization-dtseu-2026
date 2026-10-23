import { React, type AllWidgetProps } from 'jimu-core'
import type { IMConfig } from '../config'

const Widget = (props: AllWidgetProps<IMConfig>) => {

  return (
    <div className="widget-demo jimu-widget" style={{ fontSize: "25px" }}>
      <p>Basic Widget</p>
      <p>props.user.fullName: {props.user.fullName}</p>
      <p>props.config.exampleText: {props.config.exampleText}</p>
    </div>
  )
}

export default Widget
