import { useEffect, useReducer } from 'react'
import axios from 'axios'
import buildingsReducer from '../../Reducer/buildingsReducer'
import { jwtDecode } from 'jwt-decode'

export default function Home() {
  const buildingsInitialState = {
    data:[],
    serverError:[]
 }
  const [buildings, buildingsDispatch] = useReducer(buildingsReducer, buildingsInitialState)

  return (
    <div>Home</div>
  )
}
