import React, { Component, useState } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import {FloatingButton, Item} from "react-floating-button";

function FloorPlan(){
    const [state, setState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false,
      });
    return (
        <div style={{ marginTop: "32px" }}>
            <div style={{marginTop: "30px", lineHeight: 5, padding:20}}>
                <Item
                    onClick={() => setState({ isPaneOpenLeft: true })}>
                    Floor Plan
                </Item>
            </div>
            <SlidingPane
            // closeIcon={<div>Some div containing custom close icon.</div>}
            isOpen={state.isPaneOpenLeft}
            title="Floor Plan"
            from="left"
            width="600px"
            onRequestClose={() => setState({ isPaneOpenLeft: false })}
            >
            <div>
                <iframe className='pdf' src="floor_plan.pdf" height="1000" width="600"></iframe>
            </div>
            </SlidingPane>
      </div>
    )
}

export default FloorPlan 