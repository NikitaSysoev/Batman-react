import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const MoviesList = React.lazy(() => import("./components/moviesList"));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList: [],
      watched: {}
    };
  }

  localStorageToState = () => {
    const data = localStorage.getItem("batman-watched");
    if (data !== null) {
      this.setState({ watched: JSON.parse(data) });
    }
  };

  handleSee = id => {
    this.setState(
      prevState => {
        return {
          watched: {
            ...prevState.watched,
            [String(id)]: !prevState.watched[String(id)]
          }
        };
      },
      () =>
        localStorage.setItem(
          "batman-watched",
          JSON.stringify(this.state.watched)
        )
    );
  };

  componentDidMount() {
    const movies = fetch("https://api.tvmaze.com/search/shows?q=batman");
    movies
      .then(data => data.json())
      .then(data => this.setState({ moviesList: data }))
      .then(() => this.localStorageToState())
      .catch(e => console.log(e));
  }

  render() {
    const moviesList = this.state.moviesList.map(item => (
      <MoviesList
        handleSee={this.handleSee}
        key={item.show.id}
        watched={this.state.watched}
        item={item}
      />
    ));
    return (
      <Container>
        <Row>
          <Col>
            <h1>Batman Movies (TV Show's)</h1>
            <Row>
              <React.Suspense fallback={<div> Loadding....</div>}>
                {moviesList}
              </React.Suspense>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
