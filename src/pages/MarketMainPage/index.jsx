import React, { Component } from 'react';

import autoBind from "react-autobind";

import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { debounce } from 'lodash';
import { withRouter } from "react-router";

import { findEndpoint } from './service';

class MainPage extends Component {

    constructor(props) {
        super(props);

        autoBind(this);

        this.searchOrganization = debounce(this.searchOrganization.bind(this), 250);

        this.state = {
            symbol: '',
            loading: false,
            organizations: []
        }
    }

    componentDidUpdate(_, prevState) {
        if (prevState.symbol !== this.state.symbol) {
            this.searchOrganization();
        }
    }

    searchOrganization() {
        this.setLoading(true);
        findEndpoint(this.state.symbol, organizations => {
            this.setState({ organizations, loading: false })
        });
    }

    setLoading(loading) {
        this.setState({ loading });
    }

    render() {

        const { loading, symbol, organizations } = this.state;

        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Card
                        className="p-shadow-24"
                        title="Get summary"
                        subTitle="Enter a symbol and get a little summary of him"
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-search"></i>
                                    </span>
                                    <InputText
                                        id="symbol"
                                        autoFocus
                                        onChange={e => this.setState({ symbol: e.target.value })}
                                        value={this.state.symbol}
                                        aria-describedby="symbol-help"
                                        placeholder="Enter a symbol (Exemple: AMRN)"
                                    />
                                    <Button
                                        label="Search"
                                        disabled={Boolean(loading && symbol)}
                                        icon={Boolean(loading && symbol) ? "pi pi-spin pi-spinner" : "pi pi-search"}
                                        onClick={this.searchOrganization}
                                    />
                                </div>
                                <small id="symbol-help" className="p-d-block">Enter a symbol and click on search button</small>
                            </div>
                        </div>
                    </Card>

                    {symbol && (
                        <>
                            <Divider align="center">
                                <b>Result of search</b>
                            </Divider>

                            <Card className="p-shadow-24">
                                {loading ? (
                                    <div className="p-fluid">
                                        <div className="p-mb-3">
                                            <div className="p-d-flex p-ai-center">
                                                <Skeleton shape="circle" size="4rem" className="p-mr-2" />
                                                <div style={{ flex: '1' }}>
                                                    <Skeleton width="100%" className="p-mb-2" />
                                                    <Skeleton width="75%" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    organizations?.length > 0 ? (
                                        organizations.map((org, index) => {
                                            return (
                                                <div className="p-card p-p-3 p-mb-3 p-d-flex p-jc-between" key={index}>
                                                    <div>
                                                        <h5><b>{org.name}</b></h5>
                                                        <p>
                                                            <span className="p-d-block">{org.type}</span>
                                                            <span className="p-d-block">{`${org.region} - ${org.currency}`}</span>
                                                        </p>
                                                        <Tag icon="pi pi-clock" value={org.marketOpen} severity="success" className="p-mr-2" />
                                                        <Tag icon="pi pi-clock" value={org.marketClose} severity="danger" />
                                                    </div>
                                                    <div className="p-d-flex p-flex-column p-jc-between p-ai-end">
                                                        <h6><b>{org.symbol}</b></h6>
                                                        <Button
                                                            label="SEE MORE"
                                                            iconPos="right"
                                                            icon="pi pi-angle-right"
                                                            className="p-button-text p-button-sm"
                                                            onClick={() => this.props.history.push(`/company?symbol=${org.symbol}`)}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : <div className="p-text-center">No data found</div>
                                )}
                            </Card>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(MainPage);
