import React from "react";
import PropTypes from 'prop-types';
import { Button, Card, Col } from "react-bootstrap";

const MoviesList = ({ item, handleSee, watched }) => {
    const { id, image, summary, name, premiered } = item.show;
    return (
        <Col key={id}>
            <Card
                border={watched[String(id)] ? 'success' : 'primary'}
                style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image.medium} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text dangerouslySetInnerHTML={{ __html: summary }}>
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted" >{premiered} </small><br />
                        <Button
                            onClick={() => handleSee(id)}
                            variant={watched[String(id)] ? "success" : "outline-primary"}>
                            {watched[String(id)] ? 'Смотрел' : 'Не смотрел'}
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default React.memo(MoviesList);

MoviesList.propTypes = {
    item: PropTypes.shape({
        show: PropTypes.shape({
            id: PropTypes.number.isRequired,
            summary: PropTypes.string.isRequired,
            premiered: PropTypes.string.isRequired,
            image: PropTypes.shape({
                medium: PropTypes.string.isRequired
            })
        })
    }),
    handleSee: PropTypes.func.isRequired,
    watched: PropTypes.shape({
        [PropTypes.number]: PropTypes.number
    })
}