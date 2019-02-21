import React, { useEffect, useState } from 'react'
import 'isomorphic-fetch'

export default function Weather({location= 'charleston'}) {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    fetch(`https://weather.twilson63.xyz?q=${location}`)
      .then(res => res.json())
      .then(weather => setWeather(weather))

  }, [])
  return (
    !weather ? <div>loading</div> : (
    <div>
      <h1>{weather.location}</h1>
      <h3>{weather.temp}</h3>
      <h3>{weather.forecast}</h3>
    </div>
    )
  )
}

