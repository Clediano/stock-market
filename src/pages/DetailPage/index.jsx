import React, { Component } from 'react';

import { Chart } from 'primereact/chart';
import autoBind from "react-autobind";

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import { withRouter } from "react-router";

import { findCompanyOverview, findEarnings } from './service';
import { formatDateISOToDate } from '../../utilities/formatters';
import { Skeleton } from 'primereact/skeleton';

const chartOptions = {
    hoverMode: 'index',
    legend: {
        labels: {
            fontColor: '#ffffffde',
        }
    },
    scales: {
        xAxes: [{
            ticks: {
                fontColor: '#ffffffde'
            }
        }],
        yAxes: [{
            ticks: {
                fontColor: '#ffffffde'
            },
        }]
    }
};

class DetailPage extends Component {

    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            overviewLoading: false,
            annualEarningLoading: false,
            quarterlyEarningLoading: false,

            overview: {},
            dataAnnualEarningChart: {},
            dataQuarterlyEarningsChart: {}
        }
    }

    componentDidMount() {
        const symbol = new URLSearchParams(this.props.location.search).get("symbol");
        if (symbol) {
            this.searchOverview(symbol);
            this.searchEarnings(symbol);
        }
    }

    searchOverview(symbol) {
        this.setOverviewLoading(true);

        findCompanyOverview(symbol, overview => {
            this.setState({ overview, overviewLoading: false })
        });
    }

    searchEarnings(symbol) {
        this.setEarningLoading(true);

        findEarnings(symbol, earning => {
            const dataAnnualEarningChart = {
                labels: earning.annualEarnings?.map(earn => formatDateISOToDate(earn.fiscalDateEnding)),
                datasets: [{
                    label: "Earnings Per Share",
                    data: earning.annualEarnings?.map(earn => earn.reportedEPS),
                    borderColor: '#8dd0ff',
                    backgroundColor: '#8dd0ff20'
                }]
            };

            const dataQuarterlyEarningsChart = {
                labels: earning.quarterlyEarnings?.map(earn => formatDateISOToDate(earn.reportedDate)),
                datasets: [
                    {
                        label: "Estimated EPS",
                        data: earning.quarterlyEarnings?.map(earn => earn.estimatedEPS),
                        borderColor: '#b38705',
                        fill: false,
                    },
                    {
                        label: "Reported EPS",
                        data: earning.quarterlyEarnings?.map(earn => earn.reportedEPS),
                        borderColor: '#125f3b',
                        fill: false,
                    },
            ]
            };



            this.setState({
                dataAnnualEarningChart,
                dataQuarterlyEarningsChart,
                annualEarningLoading: false
            })
        });
    }

    setOverviewLoading(loading) {
        this.setState({ overviewLoading: loading });
    }

    setEarningLoading(loading) {
        this.setState({
            annualEarningLoading: loading,
            quarterlyEarning: loading
        });
    }


    render() {
        const { overview } = this.state;

        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Card
                        className="p-shadow-24 p-mb-3"
                        title={
                            <div className="p-d-flex p-jc-between">
                                <div>{overview?.Name}</div>
                                <div>{overview?.Symbol}</div>
                            </div>
                        }
                        subTitle={`${overview?.Industry} - ${overview?.AssetType}`}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-m-0">
                                <Divider align="center" type="dashed" className="p-mt-0">
                                    <b>Description</b>
                                </Divider>
                                {this.state.overviewLoading ?
                                    <Skeleton width="100%" height="150px" />
                                    :
                                    <p>{overview?.Description}</p>
                                }
                                <Divider type="dashed" className="p-m-0" />
                            </div>
                        </div>
                    </Card>

                    <Card
                        className="p-shadow-24 p-mb-3"
                        title="Annual Earnings"
                        subTitle="Quotient that serves as an indicator of the profitability of organization (Earnings Per Share - EPS)."
                    >
                        {this.state.annualEarningLoading ?
                            <Skeleton width="100%" height="366px" />
                            :
                            <Chart
                                type="line"
                                data={this.state.dataAnnualEarningChart}
                                options={chartOptions}
                            />
                        }
                    </Card>

                    <Card
                        className="p-shadow-24 p-mb-3"
                        title="Quarterly Earnings"
                        subTitle="Quotient that serves as an indicator of the profitability of organization (Earnings Per Share - EPS)."
                    >
                        {this.state.quarterlyEarningLoading ?
                            <Skeleton width="100%" height="366px" />
                            :
                            <Chart
                                type="line"
                                data={this.state.dataQuarterlyEarningsChart}
                                options={chartOptions}
                            />
                        }
                    </Card>
                </div>
            </div>
        );
    }
}

export default withRouter(DetailPage);
