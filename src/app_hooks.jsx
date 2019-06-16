import React, { useState, useEffect } from "react";
import { Container, Row, Col, CardColumns } from "react-bootstrap";
const MoviesList = React.lazy(() => import("./components/moviesList"));

const App = () => {
    const [moviesList, setMoviesList] = useState([]);
    const [watched, setWatched] = useState({});

    useEffect(() => {
        const movies = fetch("https://api.tvmaze.com/search/shows?q=batman");
        const backup = JSON.parse(localStorage.getItem("batman-watched")) || {};
        movies
            .then(data => data.json())
            .then(data => {
                setMoviesList(data);
                setWatched(backup);
                document.title = 'Batman films loaded';
            })
            .catch(e => {
                console.log(e);
                document.title = 'Error of connection';
            });
    }, []);

    useEffect(()=>{
        const oldData = localStorage.getItem("batman-watched");
        const newData = JSON.stringify(watched);
        if(oldData !== newData){
            localStorage.setItem("batman-watched", newData);
        }
    });

    const handleChangeWatched = id => {
        setWatched({
            ...watched,
            [String(id)]: !watched[id]
        });
    }

    const rendereMoviesList = moviesList.map(item => {
        const { id, name, image, summary, premiered } = item.show;
        return (
            <React.Fragment key={id}>
                <MoviesList
                    onChange={handleChangeWatched}
                    id={id}
                    name={name}
                    image={image.medium}
                    summary={summary}
                    premiered={premiered}
                    watched={watched[String(id)]}
                />
                <br />
            </React.Fragment>
        );
    });
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h1>Batman Movies (TV Show's)</h1>
                    <br />
                    <React.Suspense fallback={<div> Loading....</div>}>
                        <CardColumns>{rendereMoviesList}</CardColumns>
                    </React.Suspense>
                </Col>
            </Row>
        </Container>
    );
}

export default App;