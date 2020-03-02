
export const polyCoordsToGeoJson = coordinates => ({
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates
  }
})

export const stringCoordsToArrayCoords = pcs => [pcs.split(';').map(pc => pc.split(','))]

export const geoJsonToPolyCoords = ({ geometry: { coordinates } }) => coordsToString(coordinates)

export const coordsToString = coords =>
  coords
    .map(c => c.join(','))
    .join(';')
