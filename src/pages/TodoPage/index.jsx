import React, { Component } from 'react';

import autoBind from "react-autobind";

import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Skeleton } from 'primereact/skeleton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { FirestoreCollection, FirestoreMutation } from "@react-firebase/firestore";

import { withFormik } from 'formik';
import { formatSecondsToDate } from '../../utilities/formatters';

const initialValues = {
    title: '',
    description: '',
    dateToFinish: '',
    categories: [],
    finished: false,
    pinned: false,
    details: '',
};

class TodoPage extends Component {

    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            isModalFormVisible: false
        }
    }

    actionBodyTemplate(rowData) {
        return (
            <Button
                icon="pi pi-check-circle"
                label="Finished"
                className="p-button-rounded p-button-success p-button-text"
                onClick={() => console.log(rowData)}
            />
        );
    }

    bodySkeletonTemplate() {
        return <Skeleton />
    }

    handleSubmit(event, runMutation) {
        event.preventDefault();

        runMutation(this.props.values)
            .then(res => {
                console.log("finalizado")
            })
            
        this.props.resetForm({ values: initialValues })
    }

    render() {

        const { values, setFieldValue } = this.props;

        return (
            <>
                <div className="p-grid">
                    <div className="p-col-12">
                        <Card
                            className="p-shadow-24"
                            title="Submit a new task"
                            subTitle="You can save unlimited tasks and view on calendar or list viewer in determinated date"
                        >
                            <Button
                                label="New task"
                                icon="pi pi-plus"
                                onClick={() => this.setState({ isModalFormVisible: true })}
                            />
                        </Card>
                    </div>
                    <div className="p-col-12">
                        <Card
                            className="p-shadow-24"
                            title="Your tasks"
                            subTitle="You can check the tasks clicking on Check button"
                        >
                            <FirestoreCollection path="/task">
                                {response => {
                                    if (response.isLoading) {
                                        return (
                                            <DataTable value={new Array(5)} className="p-datatable-striped">
                                                <Column field="date" header="Date" body={this.bodySkeletonTemplate} />
                                                <Column field="title" header="Title" body={this.bodySkeletonTemplate} />
                                                <Column field="description" header="Description" body={this.bodySkeletonTemplate} />
                                                <Column field="finished" header="Finished" body={this.bodySkeletonTemplate} />
                                                <Column field="pinned" header="Pinned" body={this.bodySkeletonTemplate} />
                                            </DataTable>
                                        )
                                    }
                                    const data = response.value.map(item => ({ ...item, dateToFinish: item.dateToFinish.seconds }));
                                    return (
                                        <DataTable value={data}>
                                            <Column
                                                field="dateToFinish"
                                                header="Date"
                                                body={row => formatSecondsToDate(row.dateToFinish)}
                                            />
                                            <Column
                                                field="title"
                                                header="Title"
                                            />
                                            <Column
                                                field="description"
                                                header="Description"
                                            />
                                            <Column
                                                field="finished"
                                                header="Finished"
                                            />
                                            <Column
                                                field="pinned"
                                                header="Pinned"
                                            />
                                            <Column
                                                body={this.actionBodyTemplate}
                                            />
                                        </DataTable>
                                    )
                                }}
                            </FirestoreCollection>
                        </Card>
                    </div>
                </div>
                <Dialog
                    header="Create a new task"
                    visible={this.state.isModalFormVisible}
                    onHide={() => this.setState({ isModalFormVisible: false })}
                    breakpoints={{ '1024px': '80vw', '640px': '100vw' }}
                    style={{ width: '50vw' }}
                    maximizable
                    baseZIndex={1001}
                    modal
                >
                    <FirestoreMutation type="add" path="/task">
                        {({ runMutation }) => (
                            <form onSubmit={e => this.handleSubmit(e, runMutation)}>
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col-12 p-md-8">
                                        <label htmlFor="title">Title</label>
                                        <InputText
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={values.title}
                                            onChange={(e) => setFieldValue('title', e.target.value)}
                                        />
                                    </div>
                                    <div className="p-field p-col-12 p-md-4">
                                        <label htmlFor="navigators">Date to finish</label>
                                        <Calendar
                                            id="dateToFinish"
                                            name="dateToFinish"
                                            value={values.dateToFinish}
                                            onChange={(e) => setFieldValue('dateToFinish', e.value)}
                                            showIcon
                                            monthNavigator
                                            yearNavigator
                                            yearRange="2000:2100"
                                            touchUI
                                        />
                                    </div>
                                    <div className="p-field p-col-12">
                                        <label htmlFor="description">Description</label>
                                        <InputText
                                            id="description"
                                            type="text"
                                            name="description"
                                            value={values.description}
                                            onChange={(e) => setFieldValue('description', e.target.value)}
                                        />
                                    </div>
                                    <div className="p-field p-col-12">
                                        <label htmlFor="categories">Categories</label>
                                        <Chips
                                            id="categories"
                                            name="categories"
                                            value={values.categories}
                                            onChange={(e) => setFieldValue('categories', e.value)}
                                            separator=","
                                        />
                                        <small id="categories-help" className="p-d-block">Enter a categorie and press 'Enter' or 'Comma' to apply</small>
                                    </div>
                                    <div className="p-field p-col-12">
                                        <label htmlFor="details">Details</label>
                                        <InputTextarea
                                            id="details"
                                            type="text"
                                            rows="5"
                                            name="details"
                                            value={values.details}
                                            onChange={(e) => setFieldValue('details', e.target.value)}
                                        />
                                    </div>
                                    <div className="p-field p-col-12 p-mb-0">
                                        <div className="p-formgroup-inline">
                                            <div className="p-field-checkbox">
                                                <Checkbox
                                                    inputId="finished"
                                                    value={values.finished}
                                                    onChange={(e) => setFieldValue('finished', !values.finished)}
                                                    checked={values.finished}
                                                />
                                                <label htmlFor="finished">Finished</label>
                                            </div>
                                            <div className="p-field-checkbox">
                                                <Checkbox
                                                    inputId="pinned"
                                                    value={values.pinned}
                                                    onChange={(e) => setFieldValue('pinned', !values.pinned)}
                                                    checked={values.pinned}
                                                />
                                                <label htmlFor="pinned">Pinned</label>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        icon="pi pi-check"
                                        label="Save task"
                                    />
                                </div>
                            </form>
                        )}
                    </FirestoreMutation>
                </Dialog>
            </>
        );
    }
}

const TodoPageForm = withFormik({
    mapPropsToValues: () => initialValues,

    validate: values => {
        const errors = {};

        if (!values.task) {
            errors.task = 'Required';
        }

        return errors;
    },
})(TodoPage);

export default TodoPageForm;