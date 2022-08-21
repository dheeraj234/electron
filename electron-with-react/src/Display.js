import React from 'react'

const Display = (props) => {
    // console.log(props);
  return (
    <div>
        <div>
            <center>
            {"hello" + props.details.fname}
            </center>
        </div>
    </div>
  )
}

export default Display;