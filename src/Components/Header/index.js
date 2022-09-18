import { useState, useRef, useEffect } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { ArrowLeftSvg, ArrowRigthSvg, BloobloomSvg, CloseSvg } from "../svg";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {
  const navigate = useNavigate();
  const [menuIsOpen, setMenuIsOpen] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [firstArrowColor, setFirstArrowColor] = useState("black");
  const [secondArrowColor, setSecondArrowColor] = useState("black");
  const [url, setUrl] = useState();

  const sideMenu = useRef(null);
  const sideMenuTab = useRef(null);

  const showMenu = () => {
    setMenuIsOpen(true);
    sideMenu.current.style.left = 0;
  };
  const closeMenu = () => {
    sideMenu.current.style.left = "-600px";
    sideMenuTab.current.style.left = "-600px";
    setMenuIsOpen(false);
  };
  const hideMenu = (param) => {
    if (param === "secondMenu") {
      sideMenuTab.current.style.left = "-600px";
    }
    if (url || param !== "secondMenu") sideMenu.current.style.left = "-600px";
    setMenuIsOpen(false);
  };

  const handleTabClick = (param) => {
    setUrl(param);
    sideMenuTab.current.style.left = 0;
  };

  const goBack = () => {
    setUrl(null);
    sideMenu.current.style.left = 0;
    sideMenuTab.current.style.left = "-600px";
    setMenuIsOpen(true);
  };

  const navigateTo = (param) => {
    navigate(`/collections/${param}-${url}`);
    navigate(0);
  };

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <span className="glasses-page-header">
      <Navbar className="header" expand="lg">
        <Container>
          <Row className="pt-1">
            <Col xs={4} sm={4} md={4}>
              {!isMobile && (
                <div className="menu" onClick={showMenu}>
                  <span
                    onMouseEnter={showMenu}
                    onMouseLeave={() => hideMenu("btn")}
                    className="menu-item"
                  >
                    MENU
                  </span>
                </div>
              )}
              {!menuIsOpen && isMobile && (
                <div className="menu" onClick={showMenu}>
                  <span
                    onMouseEnter={showMenu}
                    onMouseLeave={() => hideMenu("btn")}
                    className="menu-item"
                  >
                    MENU
                  </span>
                </div>
              )}
              {menuIsOpen && (
                <div className="menu d-block d-sm-none m-2" onClick={closeMenu}>
                  <span onClick={closeMenu} className="menu-item">
                    <CloseSvg />
                  </span>
                </div>
              )}
            </Col>
            <Col xs={4} sm={4} md={{ span: 4, offset: 0 }}>
              <div className=" logo">
                <BloobloomSvg />
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <div
        ref={sideMenu}
        onMouseEnter={showMenu}
        onMouseLeave={() => hideMenu("menu")}
        className="side-menu"
      >
        <div className="side-menu-main">
          <div
            onMouseOver={() => setFirstArrowColor("white")}
            onMouseLeave={() => setFirstArrowColor("black")}
            onClick={() => handleTabClick("women")}
            className="side-menu-main-tab"
          >
            <span className="side-menu-tab-title">Women</span>
            <ArrowRigthSvg key="1" color={firstArrowColor} />
          </div>
          <div
            className="side-menu-main-tab"
            onMouseOver={() => setSecondArrowColor("white")}
            onMouseLeave={() => setSecondArrowColor("black")}
            onClick={() => handleTabClick("men")}
          >
            <span className="side-menu-tab-title">Men</span>
            <ArrowRigthSvg key="2" color={secondArrowColor} />
          </div>
          <div className="side-menu-main-tab">
            <span className="side-menu-tab-title">Home try on</span>
          </div>
          <div className="side-menu-main-tab">
            <span className="side-menu-tab-title">Pair for pair</span>
          </div>
        </div>
      </div>
      <div
        ref={sideMenuTab}
        onMouseLeave={() => hideMenu("secondMenu")}
        className="side-menu second-side-menu"
      >
        <div className="side-menu-main">
          <div onClick={goBack} className="side-menu-main-tab-back">
            <ArrowLeftSvg />
            <span className="side-menu-tab-title pe-3">Go Back</span>
          </div>
          <div
            onMouseOver={() => setFirstArrowColor("white")}
            onMouseLeave={() => setFirstArrowColor("black")}
            onClick={() => navigateTo("spectacles")}
            className="side-menu-main-tab"
          >
            <span className="side-menu-tab-title">spectacles</span>
            <ArrowRigthSvg key="1" color={firstArrowColor} />
          </div>
          <div
            className="side-menu-main-tab"
            onMouseOver={() => setSecondArrowColor("white")}
            onMouseLeave={() => setSecondArrowColor("black")}
            onClick={() => navigateTo("sunglasses")}
          >
            <span className="side-menu-tab-title">Sunglasses</span>
            <ArrowRigthSvg key="2" color={secondArrowColor} />
          </div>
        </div>
      </div>
    </span>
  );
};

export default Header;
