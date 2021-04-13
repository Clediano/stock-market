import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Card
                        className="p-shadow-24"
                        title="Get summary"
                        subTitle="Enter a symbol and get a little summary of him"
                    >
                        <div className="p-fluid">
                            <div className="p-field">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-search"></i>
                                    </span>
                                    <InputText
                                        size="lage"
                                        id="username1"
                                        aria-describedby="username1-help"
                                        className="p-d-block"
                                        placeholder="Enter a symbol (Exemple: HGLG11)"
                                    />
                                    <Button label="Search" />
                                </div>
                                <small id="username1-help" className="p-d-block">Enter a symbol and click on search button</small>
                            </div>
                        </div>

                        {/* <div className="p-m-6" /> */}
                        <Divider align="center" type="dashed">
                            <b>Result of search</b>
                        </Divider>

                        <div className="p-fluid">
                            <div className="p-mb-3">
                                <div className="p-d-flex p-ai-center">
                                    <Skeleton shape="circle" size="4rem" className="p-mr-2"></Skeleton>
                                    <div style={{ flex: '1' }}>
                                        <Skeleton width="100%" className="p-mb-2"></Skeleton>
                                        <Skeleton width="75%"></Skeleton>
                                    </div>
                                </div>
                            </div>
                            <div className="p-mb-3">
                                <div className="p-d-flex p-ai-center">
                                    <Skeleton shape="circle" size="4rem" className="p-mr-2"></Skeleton>
                                    <div style={{ flex: '1' }}>
                                        <Skeleton width="100%" className="p-mb-2"></Skeleton>
                                        <Skeleton width="75%"></Skeleton>
                                    </div>
                                </div>
                            </div>
                            <div className="p-mb-3">
                                <div className="p-d-flex p-ai-center">
                                    <Skeleton shape="circle" size="4rem" className="p-mr-2"></Skeleton>
                                    <div style={{ flex: '1' }}>
                                        <Skeleton width="100%" className="p-mb-2"></Skeleton>
                                        <Skeleton width="75%"></Skeleton>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="p-d-flex p-ai-center">
                                    <Skeleton shape="circle" size="4rem" className="p-mr-2"></Skeleton>
                                    <div style={{ flex: '1' }}>
                                        <Skeleton width="100%" className="p-mb-2"></Skeleton>
                                        <Skeleton width="75%" />
                                    </div>
                                </div>
                            </div>
                        </div>



                    </Card>
                </div>
            </div>
        );
    }
}

export default MainPage;
