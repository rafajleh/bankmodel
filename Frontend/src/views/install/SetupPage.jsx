import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import orginfo from "../../state/features/Setup/setupServices";
import "./styles.css";
import { useNavigate } from "react-router-dom";


const ActionButtons = (props) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <div className="form_body">
      <Row>
       
        <Col className="rabbi">
        {props.currentStep > 1 && (
         
            
         <div style={{width:'100%',textAlign:'left'}}>              
           <Button  className="nextbtn" onClick={handleBack}>Back</Button>
         </div>
       
     )}
          {props.currentStep < props.totalSteps && (
            <div style={{width:'100%',textAlign:'right'}}>
              <Button className="nextbtn" onClick={handleNext}>Next</Button>
            </div>
          )}
          {props.currentStep === props.totalSteps && (
            <div style={{width:'100%',textAlign:'right'}}>
            <Button className="nextbtn" onClick={handleFinish}>Finish</Button>
          </div>
            
          )}
        </Col>
      </Row>
    </div>
  );
};

const One = (props) => {
  const [info1, setInfo1] = useState({});
  const [error, setError] = useState("");

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo1((info1) => ({
      ...info1,
      [targetName]: targetValue
    }));
  };

  const validate = () => {
    if (!info1.name) setError("Cental organization name");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info1);
    }
  };

  return (
    <div className="main_div">
      <span style={{ color: "red" }}>{error}</span>
      <div className="header">Welcome to the organization installation process</div>
      <FormGroup>
        <Label> Cental organization name: </Label>
        <Input type="text" name="name" placeholder="Cental organization name" onChange={onInputChanged} style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}/>      
      </FormGroup>
      <br />
      <FormGroup>
        <Label>Organization type:</Label>
        <Input type="text" name="type" placeholder="Organization type" onChange={onInputChanged} style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}/>      
      </FormGroup>
      <FormGroup>
        <Label>Address:</Label>
        <Input type="text" name="address" placeholder="Address" onChange={onInputChanged} style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}/>      
      </FormGroup>
             
      <br />
      <ActionButtons {...props} nextStep={validate} />
    </div>
  );
};
const Two = (props) => {
  const [info2, setInfo2] = useState({});
  const [error, setError] = useState("");

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo2((info2) => ({
      ...info2,
      [targetName]: targetValue
    }));
  };

  const validate = () => {
    // if (!info2.name) setError("Organization hierarchy level");
    // else {
      setError("");
      props.nextStep();
      props.userCallback(info2);
    // }
  };

  return (
    <div className="main_div">
      <span style={{ color: "red" }}>{error}</span>
      <div className="header">Please fill the hierarchy info</div>
      <FormGroup>
        <Label>Organization hierarchy level: </Label>
        <Input type="text" name="name" placeholder="Organization hierarchy level" onChange={onInputChanged} style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}/>      
      </FormGroup>
      <br />
      <FormGroup>
        <Label>Enter the hierarchy level name:</Label>
        <Input type="text" name="hierarchy" placeholder="hierarchy level name" onChange={onInputChanged} style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}/>      
      </FormGroup>
             
      <br />
      <ActionButtons {...props} nextStep={validate} />
    </div>
  );
};
const Three = (props) => {
  const [info3, setInfo3] = useState({});
  const [error, setError] = useState("");

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo3((info3) => ({
      ...info3,
      [targetName]: targetValue
    }));
  };

  const validate2 = () => {
    // if (!info3.age) setError("Age is mandatory field");
    // else {
      setError("");
      props.nextStep();
      props.userCallback(info3);
    // }
  };

  return (
    <div className="main_div">
      <span style={{ color: "red" }}>{error}</span>
      <div className="header">Please fill the database info</div>
      {/* <FormGroup>
        <Label >
        <div className="header">Welcome <b>{props.user.name || ""}</b></div>
         
        </Label>
      </FormGroup> */}
      <FormGroup>
        <Label>Database name: </Label>
        <Input
          type="text"
          name="age"
          placeholder="Database name"
          onChange={onInputChanged} 
          style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}
        />
      </FormGroup>
      <FormGroup>
        <Label>Database host: </Label>
        <Input
          type="text"
          name="host"
          placeholder="Database host"
          onChange={onInputChanged}
          style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}
        />
      </FormGroup>
      <FormGroup>
        <Label>Database user name: </Label>
        <Input
          type="text"
          name="u_name"
          placeholder="Database user name"
          onChange={onInputChanged}
          style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}
        />
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate2} />
    </div>
  );
};
const Four = (props) => {
  const [info4, setInfo4] = useState({});
  const [error, setError] = useState("");

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo4((info4) => ({
      ...info4,
      [targetName]: targetValue
    }));
  };

  const validate2 = () => {
    if (!info4.email) setError("Super admin email");
    if (!info4.password) setError("Super admin password");

    setError("");
    props.nextStep();
    props.userCallback(info4);
  };

  return (
    <div className="main_div">
      <span style={{ color: "red" }}>{error}</span>
      <div className="header">Please fill the super admin info</div>
      
      {/* <FormGroup>
        <Label>
        <div className="header">Welcome <b>{props.user.name || ""}</b></div>
          
        </Label>
      </FormGroup> */}
      <FormGroup>
        <Label>Super admin name: </Label>
        <Input
          type="text"
          name="super_admin_name"
          placeholder="Super admin name"
          onChange={onInputChanged}
          style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}
        />
      </FormGroup>
      <FormGroup>
        <Label>Super admin email: </Label>
        <Input
          type="text"
          name="email"
          placeholder="Super admin email"
          onChange={onInputChanged}
          style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}
        />
      </FormGroup>
      <FormGroup>
        <Label>Super admin password: </Label>
        <Input
          type="text"
          name="password"
          placeholder="Super admin password"
          onChange={onInputChanged}
          style={{width: "100%", height: "33px", padding: "2px", marginTop: "6px"}}
        />
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate2} />
    </div>
  );
};

const Five = (props) => {
  console.log("step3 receive user object");
  console.log(props.user);

  const handleLastStep = () => {
    props.lastStep();
    props.completeCallback();
  };

  return (
    <div className="main_div">
      <div className="header">Summary organization hierarchy detail</div>
      <div className="header">Cental organization name: {props.user.name}</div>
      <div className="header">{props.user.age}</div>
      <br />
      <ActionButtons {...props} lastStep={handleLastStep} />
    </div>
  );
};

const SetupPage = () => {
  const navigate = useNavigate();
  const [stepWizard, setStepWizard] = useState(null);
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const assignUser = (val) => {
    console.log("parent receive user callback");
    console.log(val);
    setUser((user) => ({
      ...user,
      ...val
    }));
  };

  const handleStepChange = (e) => {
    console.log("step change");
    console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    console.log(323, user)
    try{
        orginfo(user)
        localStorage.setItem('orgname', user.name)
        navigate('/admins/login')
    }catch(e){
        console.log(328, e)
    }
  };

  return (
   
    <div>
      <div style={{marginLeft:"35%"}}>
        <div style={{textAlign: 'center', fontSize:'30px', padding:'30px', width:'400px', background:'#336b71', color:'white', borderRadius:'10px'}}>Installation Process</div>
      </div>

      <Stepper activeStep={activeStep}>
      <Step label="" />
        <Step label=""  />
        <Step label="" />
        <Step label="" />
        <Step label="" />
      </Stepper>
      {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <One userCallback={assignUser} />
        <Two user={user} />
        <Three user={user} />
        <Four user={user} userCallback={assignUser} />
        <Five user={user} completeCallback={handleComplete} />
      </StepWizard>
    </div>
  );
};

export default SetupPage;