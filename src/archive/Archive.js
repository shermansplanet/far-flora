import React from 'react';
import FirebaseImage from '../FirebaseImage';
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from 'firebase/firestore';

export default class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.db = getFirestore();
    this.state = { loading: true };
    this.loadData();
  }

  loadData = async () => {
    let archiveData = {};
    const querySnapshot = await getDocs(collection(this.db, 'planets'));
    let planets = {};
    let idList = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let locs = data.locations;
      if (isNaN(doc.id) || locs.length == 0) return;
      for (let locid of locs) {
        if (isNaN(locid) || locid == this.props.currentData.lastUpdateTime)
          return;
      }
      planets[doc.id] = doc.data();
      idList.push(doc.id);
    });

    idList.reverse();

    for (let pid of idList) {
      let planetData = {};
      for (let ii = 0; ii < planets[pid].locations.length; ii++) {
        let locid = planets[pid].locations[ii];
        const docRef = doc(this.db, 'locations', locid);
        const docSnap = await getDoc(docRef);
        planetData[locid] = { imageCount: docSnap.data().imageCount };
      }
      archiveData[pid] = planetData;
    }
    this.setState({ loading: false, archiveData, idList });
  };

  renderPlanet = (id, data) => {
    let images = [];
    for (let lid in data) {
      let loc = data[lid];
      for (let i = 0; i < loc.imageCount; i++) {
        images.push(
          <FirebaseImage
            key={lid + '_' + i}
            src={'locations/' + lid + '/' + i + '_thumbnail.png'}
            magnified={'locations/' + lid + '/' + i + '.png'}
            height={180}
            width={320}
          />
        );
      }
    }
    return (
      <div key={'planet_' + id} className="archiveRow">
        <FirebaseImage
          src={'planets/' + id + '/planet.png'}
          height={180}
          width={180}
        />
        {images}
      </div>
    );
  };

  render() {
    if (this.state.loading)
      return (
        <div className="centered" style={{ top: '100px' }}>
          <div className="loader" />
        </div>
      );
    let content = [];
    for (let planetId of this.state.idList) {
      content.push(
        this.renderPlanet(planetId, this.state.archiveData[planetId])
      );
    }

    return (
      <div className="centered" style={{ top: '100px' }}>
        {content}
      </div>
    );
  }
}
