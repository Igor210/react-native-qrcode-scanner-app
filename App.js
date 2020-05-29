/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Linking,
  View,
  Text,
  Dimensions, 
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner'
import {
  H1, Button
} from 'native-base'

const screenWidth = Math.round(Dimensions.get('window').width)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      result: null
    }
  }
  onSuccess = (e) => {
    const check = e.data.substring(0, 4);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true
    })
    if (check === 'http') {
      Linking
        .openURL(e.data)
        .catch(err => console.error('An error occured', err));
    } else {
      this.setState({
          result: e,
          scan: false,
          ScanResult: true
      })
    }
  }
  activeQR = () => {
    this.setState({
      scan: true
    })
  }
  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false
    })
  }

  render() {
    const { scan, ScanResult, result } = this.state
    const descriptions = 'QR code (abbreviated from Quick Response Code) is the trademark for a type of matrix barcode (or two-dimensional barcode) first designed in 1994 for the automotive industry in Japan. A barcode is a machine-readable optical label that contains information about the item to which it is attached. In practice, QR codes often contain data for a locator, identifier, or tracker that points to a website or application. A QR code uses four standardized encoding modes (numeric, alphanumeric, byte/binary, and kanji) to store data efficiently; extensions may also be used.';
    return (
      <View style={styles.Container}>
        <Fragment>
          <StatusBar barStyle="dark-content"/>
          {
            !scan &&
            <H1 style={styles.textAlign}>Welcome To Notebook QR Code Scanner.</H1>
          }
          {
            !scan && !ScanResult &&
            <View style={styles.cardView}>
              <Text numberOfLines={8} style={styles.descText}>{descriptions}</Text>
              <View>
                <Button rounded style={styles.buttonTouchable} onPress={this.activeQR}>
                  <Text style={styles.buttonTextStyle}>Scan Now</Text>
                </Button>
              </View>
            </View>
          }
          {
            ScanResult &&
            <Fragment>
              <Text style={styles.textTitle1}>Result!</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type: {result.type}</Text>
                <Text>Result: {result.data}</Text>
                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
                  <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          }
          {
            scan &&
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={node => this.scanner = node}
              onRead={this.onSuccess}
              topContent={
                <H1 style={{flex: 1, flexDirection: 'column', padding: 6}}>QR Code Scanning...</H1>
              }
              bottomContent={
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Button style={styles.captureButtonTouchable} onPress={() => this.scanner.reactivate()}>
                      <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                  </Button>
                  <Button danger style={styles.stopButtonTouchable} onPress={() => this.setState({ scan: false })}>
                      <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                  </Button>
                </View>
              }
            />
          }
        </Fragment>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textAlign: {
    textAlign: 'center'
  },
  cardView: {
    padding: 20
  }, 
  buttonTouchable: {
    margin: 15,
    flex: 1,
  },
  buttonTextStyle: {
    flex: 1,
    color: '#fafafa',
    textAlign: 'center'
  },
  captureButtonTouchable: {
    flex: 1,
    position: 'absolute', 
    width: screenWidth / 2, 
    left: 0, 
    bottom: 0, 
    borderRadius: 0
  },
  stopButtonTouchable: {
    flex: 1,
    position: 'absolute', 
    width: screenWidth / 2,  
    right: 0, 
    bottom: 0, 
    borderRadius: 0
  }
});

export default App;
