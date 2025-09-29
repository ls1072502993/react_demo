import { createHashRouter } from 'react-router'
import { type RouteObject } from 'react-router'
import { pageRouter, baseRouter } from './page'

export const router = createHashRouter([...pageRouter, ...baseRouter] as RouteObject[])
