import React from 'react';

const InfoRow = (props) => {
  const {text} = props;
  const {header} = props;

  return <div className="row">
           <div className="col-lg-6 col-6">
             <h6 className="gameInfoHeader">{header}</h6>  
           </div>
           <div className="col-lg-6 col-6">
             <h6 className="text-info gameInfoText">{text}</h6>
           </div>
         </div>;
};

export default InfoRow;
