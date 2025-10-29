import { useEffect } from 'react'
import webVitals from '../services/webVitals'

export const useWebVitals = () => {
  useEffect(() => {
    // Initialize Web Vitals monitoring
    webVitals.init()
    
    // Start performance observations
    webVitals.observePerformance()
    webVitals.observePageVisibility()
    webVitals.observeMemoryUsage()
  }, [])

  return {
    getVitalsSummary: () => webVitals.getVitalsSummary(),
    reportCustomMetric: (name, value, additionalData) => 
      webVitals.reportCustomMetric(name, value, additionalData)
  }
}