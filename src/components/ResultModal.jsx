import React, {useEffect, useState} from 'react';

import "../css/ResultModal.css";


const ResultModal = (props) => {
  const {id} = props;
  const {result} = props;
  let [resultText, setResultText] = useState("");
  let [terminationText, setTerminationText] = useState("");

  useEffect(() => {
    if(result.hasOwnProperty("result")){
      setResultText(result.result);
      setTerminationText(result.termination);
    }    
  }, [result]);
  
  return <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog col-lg-7 mx-auto" role="document">
      <div className="modal-content mx-auto col-lg-8 col-md-8 col-sm-8">
        <div className="modal-body">
	  <div className="row">
	    <div className="col-lg-6 col-6">
              <h6 className="gameInfoHeader">Result</h6>
	      <h6 className="text-info gameInfoText" id="resultText">{resultText}</h6>
	    </div>	  
	    <div className=" col-lg-6 col-6">
              <h6 className="gameInfoHeader">Termination</h6>
	      <h6 className="text-info gameInfoText" id="terminationText">{terminationText}</h6>
	    </div>
	  </div>
        </div>
	
        
	<button type="button" className="close text-right" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>

};

export default ResultModal;
