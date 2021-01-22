/* eslint-disable eqeqeq */
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const soundBank1 = {  
  Q: { Title: 'Cymbol Groove', ID: 'cymbal_groove', Source: "Cymbal_Groove.mp3" },
  W: { Title: 'Driving Force', ID: 'driving_force', Source: "Driving_Force_120.mp3" },
  E: { Title: 'Rat Atat', ID: 'rat_atat', Source: "RatAtat_155.mp3" },
  A: { Title: 'Basic Rock', ID: 'basic_rock', Source: "Basic_Rock_135.mp3" },
  S: { Title: 'Basic Rock Crash', ID: 'basic_rock_crash', Source: "Basic_Rock_Crash_135.mp3" },
  D: { Title: 'Basic Rock Fill', ID: 'basic_rock_fill', Source: "Basic_Rock_Fill.mp3" },
  Z: { Title: 'Finger Cymbals', ID: 'finger_cymbals', Source: "Finger_cymbals_1.mp3" },
  X: { Title: 'Hi Hat', ID: 'hi_hat', Source: "Hi_hat_close_1.mp3" },
  C: { Title: 'Mbira Note', ID: 'mbira_note', Source: "Mbira_note_1.mp3" }
};

const soundBank2 = {
  Q: { Title: 'Heater 1', ID: 'heater_1', Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  W: { Title: 'Heater 2', ID: 'heater_2', Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  E: { Title: 'Heater 3', ID: 'heater_3', Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  A: { Title: 'Heater 4', ID: 'heater_4', Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  S: { Title: 'Heater 6', ID: 'heater_6', Source: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  D: { Title: 'Open HH', ID: 'open_hh', Source: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  Z: { Title: 'Kick n Hat', ID: 'kick_in_hat', Source: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  X: { Title: 'Kick', ID: 'kick', Source: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  C: { Title: 'Closed HH', ID: 'closed_hh', Source: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
};

//  Class for outputting the bank radio buttons

class ToggleBank extends React.Component {

  render() {

    const radioBanks = [
      {name: 'Bank 1', value: 1},
      {name: 'Bank 2', value: 2},
    ];
    let radioValue = this.props.value;

    return (
      <ButtonGroup toggle>
        {radioBanks.map((radio, index) => (
          <ToggleButton
            key={index}
            type="radio"
            variant={(radioValue == radio.value) ? "primary" : "secondary"}
            name="radio"
            value={radio.value}
            checked={radioValue == radio.value}
            onChange={this.props.onChange}
          >{radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    )
  }
}

//  Class for outputting the power buttons

class TogglePower extends React.Component {

  render() {

    const radioPower = [
      {name: 'On', value: 1},
      {name: 'Off', value: 2},
    ];
    let radioValue = this.props.value;

    return (
      <ButtonGroup toggle>
        {radioPower.map((radio, index) => (
          <ToggleButton
            key={index}
            type="radio"
            variant={(radioValue == radio.value) ? "primary" : "secondary"}
            name="radio_power"
            value={radio.value}
            checked={radioValue == radio.value}
            onChange={this.props.onChange}
          >{radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    )
  }
}

//  Class for the drum machine modal and handling updates.

class DrumMachine extends React.Component {

  constructor(props) {

    super(props);

    this.handlePadClick = this.handlePadClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateBank = this.updateBank.bind(this);
    this.updatePower = this.updatePower.bind(this);
    this.state = {bank: 1, power: 1};

  }

  updateBank() {
    let radioElems = document.getElementsByName('radio');
    for (let x = 0; x < radioElems.length; x++) {
      if (radioElems[x].checked && radioElems[x].value !== this.state.bank) {
          this.setState({bank: radioElems[x].value});
      } 
    }
  }

  updatePower() {
    let radioElems = document.getElementsByName('radio_power');
    for (let x = 0; x < radioElems.length; x++) {
      if (radioElems[x].checked && radioElems[x].value !== this.state.power) {
          this.setState({power: radioElems[x].value});
      } 
    }
  }

  handlePadClick = async (padKey) => {

    var soundToPlay = document.getElementById(padKey);
    var soundTitle = (this.state.bank == 1) ? soundBank1[padKey]['Title'] : soundBank2[padKey]['Title'];
    var soundId = (this.state.bank == 1) ? soundBank1[padKey]['ID'] : soundBank2[padKey]['ID'];

    document.getElementById("display").innerHTML = soundTitle;

    var playPromise = soundToPlay.play();
    if (playPromise !== undefined) {
      playPromise.then(function () {
        console.log('Play successful ' + padKey);
      }).catch(function (error) {
        console.log('Play failed ' + padKey);
      })
    };

    window.setTimeout(function () { 
      document.getElementById(soundId).blur();  // Remove focus from pad that was pressed/clicked
    }, 0);

  };

  handleKeyPress(event) {
    const thisKey = event.key.toUpperCase();
    const regex = new RegExp('Q|W|E|A|S|D|Z|X|C');
    if (regex.test(thisKey)) {
      this.handlePadClick(thisKey);
    }
  }

  render() {

    return (
      <div onKeyPress={this.handleKeyPress}>
        <Modal show={true} centered size="lg" id="drum-machine" background="static" >
          <Modal.Header
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="modal__wrapper"
            onKeyPress={this.handleKeyPress}
          >
            <Modal.Title>
              Drum Machine
              </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal__wrapper" onKeyPress={this.handleKeyPress}>
            <Container fluid>
              <Row>
                <Col xs={{ span: 1, offset: 0 }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "lg"}}
                    className="drum-pad"
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['Q']['ID'] : soundBank2['Q']['ID']}
                    onClickCapture={() => this.handlePadClick('Q')}
                  >Q<audio className="clip" id="Q" 
                        src={(this.state.bank == 1) ? soundBank1['Q']['Source'] : soundBank2['Q']['Source']}>
                    </audio>
                  </Button>
                </Col>
                <Col xs={{ span:1, offset: 0, marginLeft: "2px" }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "ls"}}
                    className="drum-pad" 
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['W']['ID'] : soundBank2['W']['ID']} 
                    onClickCapture={() => this.handlePadClick('W')}
                  >W<audio className="clip" id="W" 
                        src={(this.state.bank == 1) ? soundBank1['W']['Source'] : soundBank2['W']['Source']}>
                    </audio>
                  </Button>
                </Col>
                <Col xs={{ span:1, offset: 0, marginLeft: "8px" }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "ls"}}
                    className="drum-pad" 
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['E']['ID'] : soundBank2['E']['ID']}
                    onClickCapture={() => this.handlePadClick('E')}
                  >E<audio className="clip" id="E" 
                        src={(this.state.bank == 1) ? soundBank1['E']['Source'] : soundBank2['E']['Source']}>
                    </audio>
                  </Button>
                </Col>
                <Col xs={{ span:7, offset: 0, marginLeft: "8px" }} md={{ span: 3, offset: 0 }}>
                  <TogglePower value={this.state.power} onChange={() => this.updatePower()}/>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={{ span: 1, offset: 0 }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "ls"}}
                    className="drum-pad" 
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['A']['ID'] : soundBank2['A']['ID']} 
                    onClickCapture={() => this.handlePadClick('A')}
                  >A<audio className="clip" id="A" 
                        src={(this.state.bank == 1) ? soundBank1['A']['Source'] : soundBank2['A']['Source']}>
                    </audio>
                  </Button>
                </Col>
                <Col xs={{ span:1, offset: 0, marginLeft: "8px" }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "ls"}}
                    className="drum-pad" 
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['S']['ID'] : soundBank2['S']['ID']}
                    onClickCapture={() => this.handlePadClick('S')}
                  >S<audio className="clip" id="S" 
                        src={(this.state.bank == 1) ? soundBank1['S']['Source'] : soundBank2['S']['Source']}>
                    </audio>
                  </Button>
                </Col>
                <Col xs={{ span:1, offset: 0, marginLeft: "8px" }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "ls"}}
                    className="drum-pad"  
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['D']['ID'] : soundBank2['D']['ID']}
                    onClickCapture={() => this.handlePadClick('D')}
                  >D<audio className="clip" id="D" 
                        src={(this.state.bank == 1) ? soundBank1['D']['Source'] : soundBank2['D']['Source']}>
                    </audio>
                  </Button>
                </Col>
                <Col xs={{ span: 7, offset: 0, marginLeft: "8px"}} md={{ span: 3, offset: 0 }}>
                  <p id="display">Drum Machine</p>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={{ span: 1, offset: 0 }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "ls"}}
                    className="drum-pad"
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['Z']['ID'] : soundBank2['Z']['ID']}
                    onClickCapture={() => this.handlePadClick('Z')}
                    >Z<audio className="clip" id="Z" 
                        src={(this.state.bank == 1) ? soundBank1['Z']['Source'] : soundBank2['Z']['Source']}>
                      </audio>
                  </Button>
                </Col>
                <Col xs={{ span:1, offset: 0, marginLeft: "8px" }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "ls"}}
                    className="drum-pad"
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['X']['ID'] : soundBank2['X']['ID']}
                    onClickCapture={() => this.handlePadClick('X')}
                  >X<audio className="clip" id="X" 
                        src={(this.state.bank == 1) ? soundBank1['X']['Source'] : soundBank2['X']['Source']}>
                    </audio>
                  </Button>
                </Col>
                <Col xs={{ span:1, offset: 0, marginLeft: "8px" }} md={{ span: 2, offset: 1 }}>
                  <Button 
                    variant="primary"
                    xs={{size: "sm"}} md={{size: "ls"}}
                    className="drum-pad"
                    disabled={(this.state.power == 1) ? false : true }
                    id={(this.state.bank == 1) ? soundBank1['C']['ID'] : soundBank2['C']['ID']}
                    onClickCapture={() => this.handlePadClick('C')}
                  >C<audio className="clip" id="C" 
                        src={(this.state.bank == 1) ? soundBank1['X']['Source'] : soundBank2['X']['Source']}>
                    </audio>
                  </Button>
                </Col>
                <Col xs={{ span:7, offset: 0, marginLeft: "8px" }} md={{ span: 3, offset: 0 }}>
                  <ToggleBank value={this.state.bank} onChange={() => this.updateBank()}/>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function App() {

  return (
    <DrumMachine />
  );
}

export default App;
