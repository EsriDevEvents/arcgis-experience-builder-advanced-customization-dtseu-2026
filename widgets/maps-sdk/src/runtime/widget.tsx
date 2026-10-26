// Demo-only widget: intentionally favors a short, easy-to-follow example over production safeguards.
import { React, type AllWidgetProps } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'
// As it's in Beta, for now, @arcgis/ai-components** requires a explicit path mapping in tsconfig.json
import '@arcgis/ai-components/components/arcgis-assistant'
import '@arcgis/ai-components/components/arcgis-assistant-navigation-agent'
import '@arcgis/ai-components/components/arcgis-assistant-data-exploration-agent'
import '@arcgis/ai-components/components/arcgis-assistant-help-agent'
import type { IMConfig } from '../config'


const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [jimuMapView, setJimuMapView] = React.useState<JimuMapView>()

  const onActiveViewChange = (activeJimuMapView: JimuMapView) => {
    if (!activeJimuMapView) {
      return
    }

    setJimuMapView(activeJimuMapView)
  }

  React.useEffect(() => {
    if (!jimuMapView?.view) return

      jimuMapView.view.constraints = {
        rotationEnabled: false
      }

  }, [jimuMapView])

  React.useEffect(() => {
    if (!jimuMapView?.mapComponent) return

    // <arcgis-map item-id="05e015c5f0314db9a487a9b46cb37eca">
    //   <arcgis-legend slot="bottom-right"></arcgis-legend>
    // </arcgis-map>

    const legend = document.createElement('arcgis-legend') as HTMLArcgisLegendElement
    legend.slot = 'bottom-right'
    jimuMapView.mapComponent.appendChild(legend)

  }, [jimuMapView])

  return (
    <div
      className="widget-demo jimu-widget"
    >
      {props.useMapWidgetIds?.[0] && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds[0]}
          onActiveViewChange={onActiveViewChange}
        />
      )}

      {jimuMapView?.view?.type === '2d' && jimuMapView.mapComponent && (
        <arcgis-assistant
          referenceElement={jimuMapView.mapComponent as HTMLArcgisMapElement}
          heading={props.config.assistantHeading}
          description="[ArcGIS Assistant Component - Beta]">
          <arcgis-assistant-navigation-agent />
          <arcgis-assistant-data-exploration-agent />
          <arcgis-assistant-help-agent />
        </arcgis-assistant>
      )}
    </div>
  )
}

export default Widget
