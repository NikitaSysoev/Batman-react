import React from "react";
import PropTypes from 'prop-types';
import { Button, Card, Col } from "react-bootstrap";

const MoviesList = ({ handleSee, id, image, summary, name, premiered, watched }) => {
    return (
        <Col>
            <Card
                border={watched ? 'success' : 'primary'}
                style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: summary }}>
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted" >{premiered} </small><br />
                        <Button
                            onClick={() => handleSee(id)}
                            variant={watched ? "success" : "outline-primary"}>
                            {watched ? 'Смотрел' : 'Не смотрел'}
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default React.memo(MoviesList);

MoviesList.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    premiered: PropTypes.string.isRequired,
    handleSee: PropTypes.func.isRequired,
    watched: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
}