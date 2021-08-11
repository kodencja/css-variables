import React from "react";
import("./css/footer.css");

function Footer({ onModalOpen }) {
  // console.log("Footer Fn");
  return (
    <footer className="down-buttons text-center">
      <button type="link" className="btn-down home-page-link shadow-mid-dark">
        <a
          href="https://codencja.herokuapp.com/"
          target="_blank"
          rel="noreferrer"
        >
          Back to Home Page
        </a>
      </button>

      <div>
        {" "}
        <b>&copy; 2021 </b>
        <i>by</i> <strong>Codencja</strong>
      </div>
      <button
        type="button"
        className="btn btn-down shadow-mid-dark"
        onClick={() => onModalOpen(true)}
      >
        Code info
      </button>
    </footer>
  );
}

export default React.memo(Footer);
