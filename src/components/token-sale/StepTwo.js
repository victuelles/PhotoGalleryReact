import React from 'react';
 
const Step2 = (props) => (
    <div className="step step2 funnel-container">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h3>Step 2: Buy Tokens</h3>
            </label>
            <div className="row content">
            <div className="wallet wallet-container">
                    <br />
                  <span>ICOs (Initial Coin Offerings) or Security Token offerings are a great way to fund and expand your business. But, you need to comply with money laundering regulations, including blocking certain geographies and individuals. You know you need to do something, but what? And, how do you do it without turning away customers, getting sued, or getting shut down by various governments? Content Ether can help.
                  </span>
              </div>
              <div className=" ">
                <p>Our platform uses digital identities that help you ensure the same person is not making multiples purchases, understand the reputation of each of your contributors, and accept as many as possible while still complying with the law.</p>
<button onClick={() => props.jumpToStep(0)}> Back </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
)

export default Step2;