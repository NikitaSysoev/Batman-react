import React from "react";
import { Container, Row, Col, CardColumns } from "react-bootstrap";
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
            [String(id)]: !prevState.watched[id]
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
    const moviesList = this.state.moviesList.map(item => {
      const { id, name, image, summary, premiered } = item.show;
      return (
        <MoviesList
          handleSee={this.handleSee}
          key={id}
          id={id}
          name={name}
          image={image.medium}
          summary={summary}
          premiered={premiered}
          watched={this.state.watched[String(id)]}
        />
      );
    });
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h1>Batman Movies (TV Show's)</h1>
            <br />
            <React.Suspense fallback={<div> Loading....</div>}>
              <CardColumns>{moviesList}</CardColumns>
            </React.Suspense>
          </Col>
        </Row>
      </Container>
    );
  }
}
