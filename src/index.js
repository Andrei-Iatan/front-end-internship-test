import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import useModal from "./useModal";

const Body = (props) => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const response = await fetch(
      "https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts"
    );
    if (response.ok) {
      const data = await response.json();
      setData(data);
    } else alert("HTTP-Error: " + response.status);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let result = [];

  if (data) {
    for (var i in data) result.push([i, data[i]]);
  }
  return (
    <div>
      {data ? (
        <div className="container">
          {result.map((el) => {
            return (
              <Box
                key={el[0]}
                title={el[1].title}
                imageBig={el[1]["thumbnail"].large}
                imageSmall={el[1]["thumbnail"].small}
                content={el[1].content}
                author={el[1]["author"].name}
                role={el[1]["author"].role}
                date={Date(el[1].date)}
                avatar={el[1]["author"].avatar}
              ></Box>
            );
          })}
        </div>
      ) : (
        <img
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgt3themes.com%2Fwp-content%2Fuploads%2F2016%2F02%2Floading.gif&f=1&nofb=1"
          className="loading"
        ></img>
      )}
    </div>
  );
};

function Box({
  imageBig,
  imageSmall,
  title,
  content,
  author,
  role,
  date,
  avatar,
}) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let a = new Date(date);
  let m = months[a.getMonth()];
  let d = a.getDate();
  let y = a.getFullYear();

  const { isShowing, toggle } = useModal();

  return (
    <div className="box">
      <div className="imageContainer" onClick={toggle}>
        <Modal
          isShowing={isShowing}
          hide={toggle}
          image={imageSmall}
          title={title}
          content={content}
          author={author}
          role={role}
          avatar={avatar}
        />
        <img src={imageBig} className="image"></img>
        <div className="overlay">
          <h2 className="text">Learn More</h2>
        </div>
      </div>
      {/* <img src={image} className="image"></img>  */}
      <div className="boxText">
        <h2 className="title">{title}</h2>
        <div className="content">{content}</div>
        <div className="footer">
          <span>
            {author} - {role}
          </span>
          <span>
            {d} {m}, {y}
          </span>
        </div>
      </div>
    </div>
  );
}

const Modal = ({
  isShowing,
  hide,
  image,
  title,
  author,
  avatar,
  role,
  content,
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
                <img src={image} className="imageModal"></img>
                <h2 className="titleModal">{title}</h2>
                <div className="contentModal">{content}</div>
                <span className="footerModal">
                  {avatar ? (
                    <img src={avatar} className="avatarModal" alt=""></img>
                  ) : (
                    <img
                      src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fthesocietypages.org%2Fsocimages%2Ffiles%2F2009%2F05%2Fvimeo.jpg&f=1&nofb=1"
                      className="avatarModal"
                    ></img>
                  )}
                  <div className="authorModal">
                    {author} - {role}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

ReactDOM.render(<Body />, document.getElementById("root"));
