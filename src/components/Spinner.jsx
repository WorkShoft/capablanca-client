import React from 'react';
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";


const styles = css`
  margin: 0 auto;
  opacity: 0.9;
`;


class Spinner extends React.Component {
  render()
  {
    return <div>
             <ClockLoader size={this.props.size} css={styles} />
           </div>;
  }
}


export default Spinner;
