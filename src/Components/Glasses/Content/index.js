import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COLLECTIONS, DEFAULT_PARAMS, GLASSESAPIURL } from "../../../consts/";
import Spinner from "react-bootstrap/Spinner";
import { Card, Col, Row } from "react-bootstrap";
import { FilterSvg } from "../../svg";
import Collapse from "react-bootstrap/Collapse";

import "./Content.scss";
import Functions from "../../../Helpers/functions";
import InfiniteScroll from "react-infinite-scroll-component";

const Content = (_) => {
  const params = useParams();
  const [openFilter, setOpenFilter] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const [glasses, setGlasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState();
  const [filter, setFilter] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    if (params.name && COLLECTIONS.includes(params.name)) {
      setTitle(Functions.getTitle(params.name));
      const apiUrl = `${GLASSESAPIURL}${params.name}${DEFAULT_PARAMS}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setGlasses(data?.glasses || []);
          setTotalCount(data.meta.total_count);
          setIsLoading(false);
        });
    }
  }, []);

  const isEmpty = glasses.length === 0;

  const handleFilterColor = (color, e) => {
    setFiltering(true);
    const elm = filter.find((e) => e.value === color);
    if (elm) {
      e.target.parentElement.firstElementChild.classList.remove(
        "border-filter"
      );
      const newObj = filter.filter((e) => e.value !== color);
      setFilter(newObj);
    } else {
      e.target.parentElement.firstElementChild.classList.add("border-filter");
      setFilter((data) =>
        data
          ? data.concat({
              name: "color",
              value: color,
              target: e.target.parentElement.firstElementChild,
            })
          : data
      );
    }
  };

  const handleFilterShape = (shape, e) => {
    const elm = filter.find((e) => e.value === shape);
    if (elm) {
      e.target.classList.remove("clicked");
      const newObj = filter.filter((e) => e.value !== shape);
      if (filter.length === 1) clearFilters();
      setFilter(newObj);
    } else {
      e.target.classList.add("clicked");
      setFilter((data) =>
        data
          ? data.concat({ name: "shape", value: shape, target: e.target })
          : data
      );
    }
  };

  const fetchData = () => {
    let url = "";
    setIndex((state) => state + 1);
    filter.forEach((element) => {
      if (element.name === "color") {
        url = `${url}&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${element.value}`;
      } else if (element.name === "shape") {
        url = `${url}&filters[
glass_variant_frame_variant_frame_tag_configuration_names][]=${element.value}`;
      }
    });
    const apiUrl = `${GLASSESAPIURL}${params.name}${DEFAULT_PARAMS}${url}`;
    fetch(`${apiUrl}&page[number]=${index + 1}`)
      .then((response) => response.json())
      .then((data) => {
        setGlasses(data?.glasses ? glasses.concat(...data.glasses) : glasses);
        setIsLoading(false);
        if (data.glasses.length === 0) setHasMore(false);
      });
  };

  const fetchDataWithFilter = () => {
    setFiltering(true);
    let url = "";
    filter.forEach((element) => {
      if (element.name === "color") {
        url = `${url}&filters[glass_variant_frame_variant_colour_tag_configuration_names][]=${element.value}`;
      } else if (element.name === "shape") {
        url = `${url}&filters[
glass_variant_frame_variant_frame_tag_configuration_names][]=${element.value}`;
      }
    });
    const apiUrl = `${GLASSESAPIURL}${params.name}${DEFAULT_PARAMS}${url}`;
    fetch(`${apiUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setGlasses(data?.glasses ? data.glasses : []);
        setFiltering(false);
        setTotalCount(data.meta.total_count);
        if (data.glasses.length === 0) setHasMore(false);
      });
  };

  const clearFilters = () => {
    setFiltering(true);
    filter.forEach((element) => {
      if (element.name === "shape") element.target.classList.remove("clicked");
      else element.target.classList.remove("border-filter");
    });
    setFilter([]);
    setIndex(1);
    const apiUrl = `${GLASSESAPIURL}${params.name}${DEFAULT_PARAMS}`;
    fetch(`${apiUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setGlasses(data?.glasses ? data.glasses : []);
        setIsLoading(false);
        setFiltering(false);
        setTotalCount(data.meta.total_count);
        if (data.glasses.length === 0) setHasMore(false);
      });
  };

  useEffect(() => {
    if (filter && filter.length > 0) {
      setHasMore(true);
      setIndex(1);
      fetchDataWithFilter();
    }
  }, [filter]);

  return (
    <div className="glasses-view">
      <Row>
        <Col className="col-image">
          <img
            src="https://staging.bloobloom.com/_nuxt/img/product3.71c49d9.jpg"
            className="header-image img-fluid"
            alt="header-img-bloobloom"
          ></img>
        </Col>
        <Col className="col-image">
          <img
            src="https://staging.bloobloom.com/_nuxt/img/product4.585699d.jpg"
            className="header-image img-fluid"
            alt="header-img-bloobloom"
          ></img>
        </Col>
      </Row>
      {COLLECTIONS.includes(params.name) && (
        <>
          <Row>
            <Col className="d-flex justify-content-evenly mt-3">
              <Col md={{ span: 4, offset: 6 }}>
                <div>
                  {title && title !== "" && (
                    <h4>
                      <b>{title}</b>
                    </h4>
                  )}
                </div>
              </Col>
              <Col className="d-flex" md={{ span: 2, offset: 2 }}>
                <h6
                  className="pointer d-flex"
                  onClick={() => setOpenFilter(!openFilter)}
                  aria-controls="collapse-filter"
                  aria-expanded={openFilter}
                >
                  <b className="pe-2 pt-1">FILTERS</b>
                  <FilterSvg />
                  {filter && filter.length > 0 && (
                    <div class="filter-div-counter">{filter.length}</div>
                  )}
                </h6>
              </Col>
            </Col>
          </Row>
          <Collapse in={openFilter}>
            <Row id="collapse-filter" className="mt-1 filter-container">
              <Col sm={12} md={4} className="filter-title">
                <Row>
                  <Col>
                    <div>
                      <h6 className="m-3">
                        <b>COLOUR</b>
                      </h6>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col md={{ span: 3, offset: 1 }} className="colors">
                    <div onClick={(e) => handleFilterColor("black", e)}>
                      <div className="colour-div">
                        <span className="colour-cover filter-border">
                          <span
                            style={{
                              backgroundImage:
                                "url('https://d1cqebbq86e0g6.cloudfront.net/assets/filters_black_01.png')",
                            }}
                          ></span>
                        </span>
                        <span>Black</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="colors">
                    <div>
                      <div
                        className="colour-div"
                        onClick={(e) => handleFilterColor("tortoise", e)}
                      >
                        <span className="colour-cover filter-border">
                          <span
                            style={{
                              backgroundImage:
                                "url('https://d1cqebbq86e0g6.cloudfront.net/assets/filters_tortoise_02.png')",
                            }}
                          ></span>
                        </span>
                        <span>Tortoise</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="colors">
                    <div>
                      <div
                        className="colour-div"
                        onClick={(e) => handleFilterColor("coloured", e)}
                      >
                        <span className="colour-cover filter-border">
                          <span
                            style={{
                              backgroundImage:
                                "url('https://d1cqebbq86e0g6.cloudfront.net/assets/filters_coloured_03.png')",
                            }}
                          ></span>
                        </span>
                        <span>Coloured</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 3, offset: 1 }} className="colors">
                    <div onClick={(e) => handleFilterColor("crystal", e)}>
                      <div className="colour-div">
                        <span className="colour-cover filter-border">
                          <span
                            style={{
                              backgroundImage:
                                "url('https://d1cqebbq86e0g6.cloudfront.net/assets/filters_crystal_04.png')",
                            }}
                          ></span>
                        </span>
                        <span>Crystal</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="colors">
                    <div>
                      <div
                        className="colour-div"
                        onClick={(e) => handleFilterColor("dark", e)}
                      >
                        <span className="colour-cover filter-border">
                          <span
                            style={{
                              backgroundImage:
                                "url('https://d1cqebbq86e0g6.cloudfront.net/assets/filters_dark_05.png')",
                            }}
                          ></span>
                        </span>
                        <span>Dark</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={3} className="colors">
                    <div>
                      <div
                        className="colour-div"
                        onClick={(e) => handleFilterColor("bright", e)}
                      >
                        <span className="colour-cover filter-border">
                          <span
                            style={{
                              backgroundImage:
                                "url('https://d1cqebbq86e0g6.cloudfront.net/assets/filters_bright_06.png')",
                            }}
                          ></span>
                        </span>
                        <span>Bright</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={4} className="filter-title">
                <Row>
                  <Col>
                    <div>
                      <h6 className="m-3">
                        <b>SHAPE</b>
                      </h6>
                    </div>
                  </Col>
                </Row>
                <Row className="shapes-row">
                  <Col sm={2} md={3} className="shapes">
                    <div
                      className="shape-div"
                      onClick={(e) => handleFilterShape("square", e)}
                    >
                      <span>Square</span>
                    </div>
                  </Col>
                  <Col sm={2} md={3} className="shapes">
                    <div
                      className="shape-div"
                      onClick={(e) => handleFilterShape("rectangle", e)}
                    >
                      <span>Rectangle</span>
                    </div>
                  </Col>
                  <Col sm={2} md={3} className="shapes">
                    <div
                      className="shape-div"
                      onClick={(e) => handleFilterShape("round", e)}
                    >
                      <span>Round</span>
                    </div>
                  </Col>
                  <Col sm={2} md={3} className="shapes">
                    <div
                      className="shape-div"
                      onClick={(e) => handleFilterShape("cat-eye", e)}
                    >
                      <span>Cat-Eye</span>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={4} className="filter-title">
                <Row>
                  <Col>
                    <div>
                      <h6 className="m-3">
                        <b>FIT</b>
                      </h6>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Collapse>

          {isLoading && (
            <Row className="mt-5">
              <Col>
                <div className="d-flex justify-content-center">
                  <Spinner variant="primary" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </Col>
            </Row>
          )}
          {!isLoading && !isEmpty && (
            <>
              {openFilter && (
                <Row>
                  <Col className="d-flex justify-content-evenly mt-3">
                    <Col md={{ span: 2, offset: 5 }}>
                      <div>
                        {!isEmpty ? (
                          <h5>
                            <b>{totalCount} RESULTS FOUND</b>
                            {filtering && (
                              <Spinner
                                className="ms-1"
                                variant="primary"
                                animation="border"
                                role="status"
                                size="sm"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            )}
                          </h5>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Col>
                    <Col md={{ span: 2, offset: 2 }}>
                      <b
                        onClick={clearFilters}
                        className="ps-3 pointer clear-filter"
                      >
                        {filter && filter.length > 0 && (
                          <> CLEAR FILTERS ({filter.length})</>
                        )}
                      </b>
                    </Col>
                  </Col>
                </Row>
              )}
              <Row id="row-scroll">
                <InfiniteScroll
                  height="100%"
                  scrollableTarget="row-scroll"
                  dataLength={glasses.length} //This is important field to render the next data
                  next={fetchData}
                  hasMore={hasMore}
                  style={{
                    position: "absolute",
                    height: "100%",
                  }}
                  loader={
                    <div className="text-center mt-2 mb-2">
                      <Spinner
                        variant="primary"
                        animation="border"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>All glasses are loaded</b>
                    </p>
                  }
                >
                  <Row xs={1} md={3} className="g-4 glasses-cards mt-1">
                    {glasses.map((glasse, idx) => {
                      return (
                        <Col key={idx}>
                          <Card>
                            <Card.Img
                              src={glasse.glass_variants[0].media[0].url}
                              alt="Card image"
                            />
                            <Card.ImgOverlay>
                              <Card.Title className="text-center">
                                <b>
                                  {glasse.glass_variants[0].frame_variant.name}
                                </b>
                              </Card.Title>
                            </Card.ImgOverlay>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </InfiniteScroll>
              </Row>
            </>
          )}
        </>
      )}
      {!COLLECTIONS.includes(params.name) && glasses.length === 0 && (
        <div>
          <Row className="mt-5">
            <Col>
              <div className="d-flex justify-content-center">
                <h3>Collection not found!</h3>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Content;
