import { useEffect, useCallback } from 'react'
import SentryService from '../services/sentry'

export const useErrorLogging = () => {
  useEffect(() => {
    // Initialize Sentry on mount
    SentryService.init()
  }, [])

  const captureError = useCallback((error, context = {}) => {
    SentryService.captureError(error, context)
  }, [])

  const captureMessage = useCallback((message, level = 'info', context = {}) => {
    SentryService.captureMessage(message, level, context)
  }, [])

  const addBreadcrumb = useCallback((message, category = 'custom', level = 'info', data = {}) => {
    SentryService.addBreadcrumb(message, category, level, data)
  }, [])

  const setUser = useCallback((user) => {
    SentryService.setUser(user)
  }, [])

  const setContext = useCallback((key, context) => {
    SentryService.setContext(key, context)
  }, [])

  const captureShopifyError = useCallback((error, operation, variables = {}) => {
    SentryService.captureShopifyError(error, operation, variables)
  }, [])

  const captureFormError = useCallback((error, formName, formData = {}) => {
    SentryService.captureFormError(error, formName, formData)
  }, [])

  const captureAnalyticsError = useCallback((error, event, data = {}) => {
    SentryService.captureAnalyticsError(error, event, data)
  }, [])

  const performanceMark = useCallback((name) => {
    SentryService.performanceMark(name)
  }, [])

  const performanceMeasure = useCallback((name, startMark, endMark) => {
    return SentryService.performanceMeasure(name, startMark, endMark)
  }, [])

  return {
    captureError,
    captureMessage,
    addBreadcrumb,
    setUser,
    setContext,
    captureShopifyError,
    captureFormError,
    captureAnalyticsError,
    performanceMark,
    performanceMeasure
  }
}