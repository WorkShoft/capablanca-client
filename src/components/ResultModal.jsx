import React, {useEffect, useState} from 'react';

const ResultModal = (props) => {
  const {id} = props;
  const {result} = props;
  let [resultText, setResultText] = useState("");
  let [terminationText, setTerminationText] = useState("");

  useEffect(() => {
    if(result.hasOwnProperty("result")){
      console.log(result);
      setResultText(result.result);
      setTerminationText(result.termination);
    }    
  }, [result]);
    
  return <div className="modal fade" id={id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div className="modal-dialog col-lg-2" role="document">
             <div className="modal-content mx-auto col-lg-9">
               <div className="modal-body">
               <div className="row mx-auto">
                 <h6 className="col">Result</h6>
                 <h6 className="col">Termination</h6>
               </div>
                                  <hr/>
                 <div className="row mx-auto">
                   <h6 className="col text-info gameInfoText">{resultText}</h6>
                   <h6 className="col text-info gameInfoText">{terminationText}</h6>
                 </div>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
             </div>
           </div>
         </div>;
};

export default ResultModal;
