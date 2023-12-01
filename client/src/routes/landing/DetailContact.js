import React from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: shadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function DetailContact(props) {
  return (
    <article className="section-10  flex-container flex-column">
      <motion.div
        className="map"
        initial={{ opacity: 0, translateX: -300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -300 }}
        transition={{ duration: 2 }}
      >
        {props.position.length !== 0 ?
          <MapContainer
            id="map"
            center={props.position}
            zoom={props.zoomLevel}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={props.position} />
          </MapContainer>
          : null}
      </motion.div>
      <motion.div
        className="contact-emails"
        initial={{ opacity: 0, translateX: 300 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: 300 }}
        transition={{ duration: 2 }}
      >
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        {props.info.map((item, index) => {
          return (
            <section key={index}>
              <h4>{item.title}</h4>
              {item.description.split("\n").map((line, index) => {
                return <p key={index}>{line}</p>
              })}
            </section>
          )
        })}
      </motion.div>
    </article>
  );
}

export default DetailContact;
