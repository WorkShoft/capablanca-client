import React, {useEffect, useState} from 'react';

import InfoRow from "./InfoRow";

import {removeUnderscore} from "../utils/utils.jsx";
import "../css/InfoModal.css";


const InfoModal = (props) => {
  const {id} = props;
  const {info} = props;

  const [infoColumn, setInfoColumn] = useState("");
 
  useEffect(() => {
    if(info !== ""){
      console.log(info);
      setInfoColumn(Object.keys(info).map(
        (key, index) => <InfoRow key={key} header={removeUnderscore(key)} text={info[key]} />));
    }    
  }, [info]);
  
  return <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-hidden="true">
           <div className="modal-dialog col-lg-7 mx-auto" role="document">
             <div className="modal-content mx-auto col-lg-8 col-md-8 col-sm-8">
               <div className="modal-body">
                 {infoColumn}                  
               </div>	        
	       <button type="button" className="close text-right" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
	     </div>
           </div>
         </div>;


};

export default InfoModal;
