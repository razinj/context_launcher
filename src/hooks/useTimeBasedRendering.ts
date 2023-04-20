import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTemporaryPinnedAppsConfigMemoized } from '../slices/pinnedApps'

type CheckResult = {
  startRenderingTimeOutId: NodeJS.Timeout | undefined
  stopRenderingTimeOutId: NodeJS.Timeout | undefined
}

export const useTimeBasedRendering = () => {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [canRender, setCanRender] = useState(false)

  const temporaryPinnedAppsConfig = useSelector(selectTemporaryPinnedAppsConfigMemoized)

  useEffect(() => {
    setStartDate(temporaryPinnedAppsConfig.startDate ? new Date(temporaryPinnedAppsConfig.startDate) : undefined)
    setEndDate(temporaryPinnedAppsConfig.endDate ? new Date(temporaryPinnedAppsConfig.endDate) : undefined)
  }, [temporaryPinnedAppsConfig.startDate, temporaryPinnedAppsConfig.endDate])

  useEffect(() => {
    let startRenderingTimeOut: NodeJS.Timeout | undefined
    let stopRenderingTimeOut: NodeJS.Timeout | undefined

    const {
      startRenderingTimeOutId: initialStartRenderingTimeOutId,
      stopRenderingTimeOutId: initialStopRenderingTimeOutId,
    } = check()
    startRenderingTimeOut = initialStartRenderingTimeOutId
    stopRenderingTimeOut = initialStopRenderingTimeOutId

    const intervalId = setInterval(() => {
      const { startRenderingTimeOutId, stopRenderingTimeOutId } = check()
      startRenderingTimeOut = startRenderingTimeOutId
      stopRenderingTimeOut = stopRenderingTimeOutId
    }, 60_000)

    return () => {
      clearTimeout(startRenderingTimeOut)
      clearTimeout(stopRenderingTimeOut)
      clearInterval(intervalId)
    }
  }, [startDate, endDate])

  const check = (): CheckResult => {
    let startRenderingTimeOut: NodeJS.Timeout | undefined
    let stopRenderingTimeOut: NodeJS.Timeout | undefined

    if (!startDate || !endDate) {
      setCanRender(false)

      return {
        startRenderingTimeOutId: undefined,
        stopRenderingTimeOutId: undefined,
      }
    }

    const currentDate = new Date()

    // Update current dates if old date
    if (currentDate.getDate() !== startDate.getDate() || currentDate.getDate() !== endDate.getDate()) {
      setStartDate(new Date(startDate.setDate(currentDate.getDate())))
      setEndDate(new Date(endDate.setDate(currentDate.getDate())))
    }

    const shouldRenderNow = currentDate.getTime() >= startDate.getTime() && currentDate.getTime() <= endDate.getTime()

    if (shouldRenderNow) {
      // Start rendering
      setCanRender(true)

      // Set timeout to stop rendering at end date
      const isCurrentDateAheadOfStartDate = currentDate.getTime() > startDate.getTime()
      const renderingStartDate = isCurrentDateAheadOfStartDate ? currentDate.getTime() : startDate.getTime()
      const timeToStopRendering = endDate.getTime() - renderingStartDate
      startRenderingTimeOut = setTimeout(() => setCanRender(false), timeToStopRendering)
      stopRenderingTimeOut = undefined
    } else {
      // Stop rendering
      setCanRender(false)

      // Set timeouts to start rendering at start date and end rendering at end date
      const timeToStartRendering = startDate.getTime() - currentDate.getTime()
      const timeToStopRendering = endDate.getTime() - currentDate.getTime()

      if (timeToStartRendering > 0 && timeToStopRendering > 0) {
        startRenderingTimeOut = setTimeout(() => setCanRender(true), timeToStartRendering)
        stopRenderingTimeOut = setTimeout(() => setCanRender(false), timeToStopRendering)
      } else if (timeToStartRendering < 0 && timeToStopRendering > 0) {
        const innerTimeToStopRendering = endDate.getTime() - currentDate.getTime()
        stopRenderingTimeOut = setTimeout(() => setCanRender(false), innerTimeToStopRendering)
        setCanRender(true)
      } else {
        startRenderingTimeOut = undefined
        stopRenderingTimeOut = undefined
      }
    }

    return {
      startRenderingTimeOutId: startRenderingTimeOut,
      stopRenderingTimeOutId: stopRenderingTimeOut,
    }
  }

  return canRender
}
