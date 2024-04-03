import React, { useContext } from 'react';
import BuildingContext from '../../ContextApi/BuildingContext'

export default function HomeDisplay() {
    const {buildings} = useContext(BuildingContext)
    console.log(buildings.data);
  return (
    <div>
        <h4>HomeDisplay</h4>
        <h5>Here i will get the passed data and design my ui</h5>
        <h4>{props.buildings.data.length}</h4>
    </div>
  )
}
