import React, { useContext } from "react";
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";
import { IncidentsContext } from "../../Context";


export default () => {
    const {incidents, monthly} = useContext(IncidentsContext);
    
    const lineOptions = {
        chart: {type: 'areaspline'},
        title: {text: 'Monthly Impact'},
        legend: {enabled: false},
        xAxis: {
            categories: monthly.map(item => item.name)
        },
        yAxis: {
            title: {
                text: null
            },
            tickAmount: 3,
            labels: {
                formatter: function () {
                    return `${moment.duration(this.value, "milliseconds").humanize()}`;
                }
            }
        },
        tooltip: {
            formatter: function() {
                return `<b>${this.x}</b> Impact: <b>${moment.duration(this.y, "milliseconds").humanize()}</b>`;
            }
        },
        series: [{
            data: monthly.map(item => item.out)
        }]
    };
    const pieOptions = {
        chart: {type: 'pie'},
        title: {text: 'Recent Activity'},
        tooltip: {
            formatter: function() {
                return `<b>${this.key}</b> Impact: <b>${moment.duration(this.y, "milliseconds").humanize()}</b>`;
            }
        },
        series: [{
            name: "Impact",
            data: incidents.slice(0,7).map(item => ({name: item.application, y: item.totalOut}))
        }]
    };

    return <React.Fragment>
        <Jumbotron fluid className="mb-5 text-light bg-secondary">
            <Container>
                <h1 className="display-4">Dashboard</h1>
            </Container>
        </Jumbotron>
        <Container>
            {incidents ? <React.Fragment>
                <Row className="mb-5 mt-5">
                    <Col lg={8}>
                        <HighchartsReact highcharts={Highcharts} options={pieOptions}/>
                        <div className="mt-5">
                            <HighchartsReact highcharts={Highcharts} options={lineOptions}/>
                        </div>
                    </Col>
                    
                    <Col lg={4} className="animated zoomIn faster">
                        <ListGroup>
                            {incidents.slice(0,7).map((item,i) => <ListGroup.Item key={i}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1">{i+1}. {item.application}</h6>
                                </div>
                                <small>{item.startText}</small><br/>
                                <small className="text-muted">{item.outageText}</small>
                            </ListGroup.Item>)}
                        </ListGroup>
                    </Col>
                </Row>
            </React.Fragment> : null}
        </Container>
        
    </React.Fragment>
}