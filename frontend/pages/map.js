import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import { longdo, map, LongdoMap } from './LongdoMap'
//replace a LongdoMap.js file

class App extends Component {

  initMap(){
    map.Layers.setBase(longdo.Layers.GRAY);
  }

  render() {
    const mapKey = 'b8429a926e70dae2f6296eba713f025a'
    return (
            <div className={styles.map}>
                <br/>
            <LongdoMap id="longdo-map" mapKey={mapKey} callback={this.initMap} />
        </div>
      
    );
  }
}

export default App;