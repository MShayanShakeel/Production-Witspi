import React, { useState } from "react";
import bgImg1 from "../../../images/bg1.jpg";

const Getcontactinfo = ({activeContact}) => {

  const [hiddenGetComponent  , SetHiddinGetComponent] = useState(false);

  const handleComponentHidden = () => {
    SetHiddinGetComponent(true);
  }
    console.log(activeContact, "activecontact")
  return (
    <>
    {!hiddenGetComponent && (
      <div style={{
                // backgroundImage: `url(${bgImg1})`,
                // width: "100%",
                height: "auto",
                 marginBottom : "10px",
                //  border: "1px solid white",
                //  overflow: 'hidden',
                //  backgroundRepeat: 'no-repeat',
                 backgroundSize: 'cover'
            }}>

      <div className="Main-contact ">
        <div className="container contact-container">
          {/* <div className="Contact-heading">
            <h1>welcome to Witspi</h1>
          </div> */}
          <form>
            <div className="row textfield-row">
              <div className="col-6 textfield-col" style={{marginTop  :"20px"}}>
              <label className="lable-create-contact">First Name </label>
                <label className="contact-text-field">{activeContact?.firstName} </label>
               
              </div>

              <div className="col-6 textfield-col" style={{marginTop  :"20px"}}>
              <label className="lable-create-contact">Last Name </label>
              <label className="contact-text-field">{activeContact?.lastName} </label>
              </div>

              <div className="col-6 textfield-col" style={{marginTop  :"20px"}}>
              <label className="lable-create-contact">E-mail</label>
              <label className="contact-text-field">{activeContact?.email}</label>
              </div>

              <div className="col-6 textfield-col" style={{marginTop  :"20px"}}>
              <label className="lable-create-contact">Contact # NO</label>
              <label className="contact-text-field">{activeContact?.number}</label>
              </div>

              <div className="col-6 textfield-col" style={{marginTop  :"20px"}}>
              <label className="lable-create-contact">Gender</label>
              <label className="contact-text-field">{activeContact?.gender}</label>
              </div>

              <div className="col-6 textfield-col" style={{marginTop  :"20px"}}>
              <label className="lable-create-contact">Country</label>
              <label className="contact-text-field">{activeContact?.country}</label>
              </div>

             

              <div className="col-6 textfield-col" style={{marginTop  :"20px"}}>
              <label className="lable-create-contact">Age</label>
              <label className="contact-text-field">{activeContact?.age}</label>
              </div>

              {/* <div className="col-6 textfield-col" style={{marginTop  :"20px"}}>
              <label className="contact-text-field">{activeContact?.tags}</label>
              </div> */}
              
            </div>
            
                 <div className="Contact-button-div">
                 <button type="button" class="btn-create-contact "
                 onClick={handleComponentHidden} >Exit</button>
                 </div>
          </form>
        </div>
      </div>
      </div>
    )}
    </>
  );
};

export default Getcontactinfo;
