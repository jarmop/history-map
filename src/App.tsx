// import { ElementNode, parse, RootNode, TextNode } from "svg-parser";
// import map from "./assets/World_map_blank_without_borders.svg";
// import simpleMap from "./assets/blank-map-world-simple.svg";
// import simpleMap from "./assets/Simple_world_map.svg";
// import { map as mapString } from "./map-svg-string.ts";
import "./App.css";
import { CustomMap } from "./CustomMap";
// import { Mapsvg } from "./map-components/Mapsvg";
// import { BlankMap } from "./map-components/BlankMap";
// import { SimpleWorldMap } from "./map-components/SimpleWorldMap";
// import { TestSvg } from "./TestSvg";
import { WorldMap } from "./world-map/WorldMap";

// function getFirstElementNode(node: ElementNode | RootNode) {
//   return node.children[0] as ElementNode;
// }

function App() {
  // console.log(map);
  // const map = parse(mapString);
  // console.log(map);
  // const properties = getFirstElementNode(getFirstElementNode(map)).properties;

  // console.log(properties?.d?.length);

  return (
    <div>
      {/* <img
        src={simpleMap}
        alt="Map"
        // className="map"
        // style={{ background: "lightblue" }}
      /> */}
      {/* <BlankMap /> */}
      {/* <SimpleWorldMap /> */}
      {/* <img src={map} alt="Map" className="map" /> */}
      {/* <Mapsvg /> */}
      {/* <TestSvg /> */}
      {/* <WorldMap /> */}
      <CustomMap />
    </div>
  );
}

export default App;
