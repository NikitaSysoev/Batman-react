import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

const MoviesList = ({ onChange, id, image, summary, name, premiered, watched = false }) => {
    return (
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
                        onClick={() => onChange(id)}
                        variant={watched ? "success" : "outline-primary"}>
                        {watched ? 'Смотрел' : 'Не смотрел'}
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default React.memo(MoviesList);

MoviesList.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    premiered: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    watched: PropTypes.bool,
    name: PropTypes.string.isRequired
}