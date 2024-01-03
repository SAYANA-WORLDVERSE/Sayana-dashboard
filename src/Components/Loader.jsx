import React,{Fragment} from 'react';


const Loader = () => {
  return <Fragment>
   <div className="typing-indicator">
    <div className="typing-circle"></div>
    <div className="typing-circle"></div>
    <div className="typing-circle"></div>
    <div className="typing-shadow"></div>
    <div className="typing-shadow"></div>
    <div className="typing-shadow"></div>
</div>
  </Fragment>
}

export default Loader;