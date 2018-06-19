import React from 'react';

const FooterPage = () => 
    <footer className="footer text-center">
      <div className="container">
        <ul className="list-inline mb-5">
          <li className="list-inline-item">
            <a className="social-link rounded-circle text-white mr-3" >
            <i className="fa fa-facebook-official" aria-hidden="true"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="social-link rounded-circle text-white mr-3" >
            <i className="fa fa-twitter-square" aria-hidden="true"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="social-link rounded-circle text-white" >
            <i className="fa fa-github-square" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
        <p className="text-muted small mb-0">Copyright &copy; (c)Rom 2018</p>
      </div>
    </footer>
  
export default FooterPage;