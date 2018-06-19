import React from 'react';
 
const Step3 = (props) => (
    <div className="step step2 funnel-container">
      <div className="row">
        <form id="Form" className="form-horizontal">
          <div className="form-group">
            <label className="col-md-12 control-label">
              <h3>Step 3: Confirmation of Sale</h3>
            </label>
            <div className="row content">
            <div className="wallet wallet-container">
                    <br />
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
              </div>
              <div className=" ">
                <p>OSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                </p>
                  <button onClick={() => props.jumpToStep(1)}> Back </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
)

export default Step3;