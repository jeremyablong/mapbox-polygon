import React, { Component } from "react";
import axios from "axios";
import "./MapArea.css";
import mapboxgl from "mapbox-gl";
import Select from "react-select";
import { v4 as uuid } from 'uuid'
import { polyCoordsToGeoJson } from '../../utils/geoJsonUtil';
import { connect } from "react-redux";
import { coords } from "../../actions/coords.js";

const methodOptions = [
  { value: "driving", label: "Driving" },
  { value: "cycling", label: "Cycling" },
  { value: "walking", label: "Walking" }
];

const timeOptions = [
  { value: "5", label: "5 MIN" },
  { value: "15", label: "15 MIN" },
  { value: "30", label: "30 MIN" }
];

class MapArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // latitude: 42.458859,
      latitude: 42.06050735516348,
      // longitude: -88.774948,
      longitude: -87.70440464394191,
      data: null,
      method: {
        value: "driving",
        label: "Driving"
      },
      time: {
        value: "15",
        label: "15 Min"
      },
      map: null
    };
  }

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmFtYW5zaWxpbiIsImEiOiJjazM2enltOTUwNnJlM2hzYmh4cXB4cjA2In0.82QNIE5jNkfJC4eKac0BSw";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v8",
      center: [this.props.lng, this.props.lat],
      zoom: 10
    });

    const canvas = map.getCanvasContainer();

    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [this.props.lng, this.props.lat]
          }
        }
      ]
    };

    const onMove = e => {
      const coords = e.lngLat;

      canvas.style.cursor = "grabbing";

      geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
      map.getSource("point").setData(geojson);
    };

    const onUp = e => {
      const coords = e.lngLat;

      // Unbind mouse/touch events
      map.off("mousemove", onMove);
      map.off("touchmove", onMove);

      this.setState({
        latitude: coords.lat,
        longitude: coords.lng
      }, () => {
        this.props.coords(coords.lng, coords.lat);
        this.renderSubmit(coords.lng, coords.lat);
      });
    };

    map.on("load", () => {
      // Add a single point to the map
      map.addSource("point", {
        type: "geojson",
        data: geojson
      });

      map.addLayer({
        id: "point",
        type: "circle",
        source: "point",
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be"
        }
      });

      map.addSource('region', {
        type: 'geojson',
        data: polyCoordsToGeoJson(this.props.coords)
      })

      map.addLayer({
        id: 'region',
        type: "fill",
        source: 'region',
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8
        }
      });

      // When the cursor enters a feature in the point layer, prepare for dragging.
      map.on("mouseenter", "point", function() {
        map.setPaintProperty("point", "circle-color", "#3bb2d0");
        canvas.style.cursor = "move";
      });

      map.on("mouseleave", "point", function() {
        map.setPaintProperty("point", "circle-color", "#3887be");
        canvas.style.cursor = "";
      });

      map.on("mousedown", "point", function(e) {
        // Prevent the default map drag behavior.
        e.preventDefault();

        canvas.style.cursor = "grab";

        map.on("mousemove", onMove);
        map.once("mouseup", onUp);
      });

      map.on("touchstart", "point", function(e) {
        if (e.points.length !== 1) return;

        // Prevent the default map drag behavior.
        e.preventDefault();

        map.on("touchmove", onMove);
        map.once("touchend", onUp);
      });
    });

    this.setState({ 
      map 
    });
  }

  handleMethodChange = selectedOption => {
    const { lat, lng } = this.props;
    this.setState(
      {
        method: selectedOption
      },
      () => {
        this.props.coords(lng, lat);
        this.renderSubmit(lng, lat);
      }
    );
  };

  handleTimeChange = selectedOption => {
    const { lat, lng } = this.props;
    this.setState(
      {
        time: selectedOption
      },
      () => {
        this.props.coords(lng, lat);
        this.renderSubmit(lng, lat);
      }
    );
  };
  renderSubmit = (lng, lat) => {
    const { method, time } = this.state;

    mapboxgl.accessToken =
      "pk.eyJ1IjoicmFtYW5zaWxpbiIsImEiOiJjazM2enltOTUwNnJlM2hzYmh4cXB4cjA2In0.82QNIE5jNkfJC4eKac0BSw";

    const mapBoxUrl = `https://api.mapbox.com/isochrone/v1/mapbox/${method.value}/${this.props.lng},${this.props.lat}?contours_minutes=${time.value}&polygons=true&access_token=pk.eyJ1IjoicmFtYW5zaWxpbiIsImEiOiJjazM2enltOTUwNnJlM2hzYmh4cXB4cjA2In0.82QNIE5jNkfJC4eKac0BSw`;

    axios.get(mapBoxUrl).then(res => {
      this.setState(
        {
          data: res.data.features,
          id: uuid()
        }, () => {
          
          this.setState({
            data: this.state.data[0].geometry
          });

          setTimeout(() => {
            const geoJson = {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: this.state.data.coordinates
              }
            }
            
            this.state.map.getSource("region").setData(geoJson)

            this.props.updateCoords(this.state.data.coordinates[0])
          }, 300);
        }
      );
    });
  };
  renderStoreChanges = () => {
    if (this.props.lat && this.props.lng) {
      console.log("got both")
    }
  }
  componentDidUpdate () {
    console.log("changesx") 
  }
  render() {
    console.log(this.state);
    const { time, method } = this.state;
    return (
      <div className="MapArea">
        <div id="map" />
        <Select
          value={method}
          onChange={this.handleMethodChange}
          options={methodOptions}
          placeholder="Travel Method"
        />
        <Select
          value={time}
          onChange={this.handleTimeChange}
          options={timeOptions}
          placeholder="Distance"
        />
        {this.renderStoreChanges()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state :", state);
  return {
    lat: state.coords.lat ? state.coords.lat : 42.06050735516348,
    lng: state.coords.lng ? state.coords.lng : -87.70440464394191
  }
}

export default connect(mapStateToProps, { coords })(MapArea);
