import React from 'react'
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

function OperatorNav() {
  const pepe = () => {

  }
  return (
    <div>
      <h1>Operator Navigation</h1>

      <Map view={{center: [0, 0], zoom: 2}} onClick={pepe}>

    </Map>
    </div>
  )
}

export default OperatorNav
