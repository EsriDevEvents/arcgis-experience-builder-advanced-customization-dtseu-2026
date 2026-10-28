import { getAppStore } from 'jimu-core'

export interface SectionInfos {
  sectionId: string
  viewId: string
}

// Use the widget ID to determine whether the widget is in a Section / View
// and retrieve the Section and View IDs.
export const getMySectionInfos = (widgetId: string): SectionInfos => {
  let viewId: string, sectionId: string
  const layoutsArray = Object.values(getAppStore().getState().appConfig.layouts)
  layoutsArray.forEach(layout => {
    if (layout.content) {
      const contentArray = Object.values(layout.content)
      const widgetContent = contentArray.filter(w => w.widgetId === widgetId)
      if (widgetContent.length > 0) {
        if (layout.parent?.id && layout.parent?.id?.startsWith('view_')) {
          viewId = layout.parent.id
          const appSections = getAppStore().getState().appConfig.sections
          if (appSections) {
            const sectionArray = Object.values(appSections)
            sectionArray.forEach(section => {
              const viewsArray = Object.values(section.views)
              const myViewsArray = viewsArray.filter(v => v === viewId)
              if (myViewsArray.length > 0) {
                sectionId = section.id
                console.log(sectionId)
              }
            })
          }
        }
      }
    }
  })
  return {
    sectionId: sectionId,
    viewId: viewId
  }
}