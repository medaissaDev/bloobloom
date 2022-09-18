const CloseSvg = () => {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 1L12 12" stroke="black"></path>{" "}
      <path d="M12 1L1 12" stroke="black"></path>
    </svg>
  );
};

const ArrowRigthSvg = (props) => {
  return (
    <svg
      width="11"
      height="16"
      viewBox="0 0 11 16"
      fill="none"
      className="side-menu-tab-icon"
    >
      <path
        d="M1 1L9 8.2L1 15.4"
        stroke={props.color}
        strokeOpacity="0.85"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
};

const ArrowLeftSvg = (props) => {
  return (
    <svg
      width="11"
      height="16"
      viewBox="0 0 11 16"
      fill="none"
      className="sidemenu-tab-icon"
    >
      <path
        d="M10 15.3999L2 8.1999L10 0.999902"
        stroke="black"
        strokeOpacity="0.85"
        strokeWidth="1.5"
      ></path>
    </svg>
  );
};

export { CloseSvg, ArrowRigthSvg, ArrowLeftSvg };
