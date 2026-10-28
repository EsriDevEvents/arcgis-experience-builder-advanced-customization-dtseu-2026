import { type IMState, React, WidgetState, type AllWidgetProps } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'
import type Point from 'esri/geometry/Point'
import { useSelector } from 'react-redux'
// shared code imports
import { getMySectionInfos } from 'widgets/shared-code/entry_dts'
const { useState, useRef, useEffect, useCallback } = React

const Widget = (props: AllWidgetProps<any>) => {
  const [latitude, setLatitude] = useState<string>('')
  const [longitude, setLongitude] = useState<string>('')
  const jimuMapView = useRef<JimuMapView>(null)
  const cursorUrl = `${props.context.folderUrl}dist/runtime/assets/esri-favicon.svg`
  const sectionId = useRef<string>(undefined)
  const viewId = useRef<string>(undefined)

  const clearMapView = () => {
    if (jimuMapView.current) {
      jimuMapView.current.view.container.style.cursor = 'default'
    }
  }

  const initMapView = useCallback(() => {
    if (jimuMapView.current) {
      jimuMapView.current.view.container.style.cursor = `url("${cursorUrl}") 24 24, crosshair`
    }
  }, [cursorUrl])

  useEffect(() => {
    return () => {
      // Reset the mouse cursor when the widget is unmounted.
      // This occurs when the widget's window is closed,
      // or when the widget is removed during configuration in Builder.
      clearMapView()
    } }, [])

  // This function is called whenever the widget state in props.state changes.
  // This occurs when the widget is opened or closed within a Widget Controller.
  useEffect(() => {
    // Reset the mouse cursor when the widget is closed in the controller.
    if (props.state === WidgetState.Closed && jimuMapView.current) {
      clearMapView()
    }
    // Change the mouse cursor when the widget is opened again in the controller.
    if (props.state === WidgetState.Opened && jimuMapView.current) {
      initMapView()
    }
  }, [cursorUrl, initMapView, props.state])

  // Selecting the sectionInfo of the Redux store's state.appRuntimeInfo
  const viewState = useSelector((state: IMState) => {
    // Initially, determine which Section and View the widget is located in.
    if (sectionId.current === undefined) {
      const sectionInfos = getMySectionInfos(props.widgetId)
      sectionId.current = sectionInfos.sectionId
      viewId.current = sectionInfos.viewId
    }
    const viewState = state.appRuntimeInfo.sectionNavInfos ? state.appRuntimeInfo.sectionNavInfos[sectionId.current] : undefined
    return viewState
  })

  // This function is called whenever the viewState variable changes.
  // This occurs when the views in the section are switched.
  useEffect(() => {
    if (viewState?.currentViewId === viewId.current) {
      // Widget is currently visible. Set cursor.
      initMapView()
    }
    if (viewState?.previousViewId === viewId.current) {
      // Widget is no longer visible. Reset cursor.
      clearMapView()
    }
  }, [initMapView, viewState])

  const activeViewChangeHandler = (jmv: JimuMapView) => {
    jimuMapView.current = jmv
    if (jmv) {
      initMapView()
      // When the pointer moves, take the pointer location and create a Point
      // Geometry out of it (`view.toMap(...)`), then update the state.
      jmv.view.on('pointer-move', (evt) => {
        const point: Point = jmv.view.toMap({
          x: evt.x,
          y: evt.y
        })
        setLatitude(point.latitude.toFixed(3))
        setLongitude(point.longitude.toFixed(3))
      })
    }
  }

  return <div className="widget-starter jimu-widget">
    {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
      <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds?.[0]} onActiveViewChange={activeViewChangeHandler} />
    )}
    <p>
      Lat/Lon: {latitude} {longitude}
    </p>
  </div>
}

export default Widget
