import React from 'react';

import { FirestoreMutation } from "@react-firebase/firestore";

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Formik } from 'formik';

const initialValues = {
    id: '',
    title: '',
    description: '',
    dateToFinish: new Date(),
    categories: [],
    finished: false,
    pinned: false,
    details: '',
};

export const FormDialog = props => {
    const { visible, onHide, itemSelected } = props;

    return (
        <Dialog
            header="Create a new task"
            visible={visible}
            onHide={onHide}
            breakpoints={{ '1024px': '80vw', '640px': '100vw' }}
            style={{ width: '50vw' }}
            maximizable
            baseZIndex={1001}
            modal
        >
            <FirestoreMutation
                type={itemSelected ? "update" : "add"}
                path={itemSelected ? `/tasks/${itemSelected.id}` : "/tasks"}
            >
                {({ runMutation }) => (
                    <Formik
                        initialValues={itemSelected ? itemSelected : initialValues}
                        onSubmit={values => {
                            runMutation(values).then(() => {
                                onHide()
                            });
                        }}
                    >
                        {({ values, setFieldValue, handleSubmit }) => (
                            <>
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col-12 p-md-7">
                                        <label htmlFor="title">Title</label>
                                        <InputText
                                            autoFocus
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={values.title}
                                            onChange={e => setFieldValue('title', e.target.value)}
                                        />
                                    </div>
                                    <div className="p-field p-col-12 p-md-5">
                                        <label htmlFor="navigators">Date to finish</label>
                                        <Calendar
                                            id="dateToFinish"
                                            name="dateToFinish"
                                            value={values.dateToFinish}
                                            onChange={e => setFieldValue('dateToFinish', e.value)}
                                            showIcon
                                            touchUI
                                            monthNavigator
                                            yearNavigator
                                            yearRange="2000:2100"
                                        />
                                    </div>
                                    <div className="p-field p-col-12">
                                        <label htmlFor="description">Description</label>
                                        <InputText
                                            id="description"
                                            type="text"
                                            name="description"
                                            value={values.description}
                                            onChange={e => setFieldValue('description', e.target.value)}
                                        />
                                    </div>
                                    <div className="p-field p-col-12">
                                        <label htmlFor="categories">Categories</label>
                                        <Chips
                                            id="categories"
                                            name="categories"
                                            value={values.categories}
                                            onChange={e => setFieldValue('categories', e.value)}
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
                                            onChange={e => setFieldValue('details', e.target.value)}
                                        />
                                    </div>
                                    <div className="p-field p-col-12 p-mb-0">
                                        <div className="p-formgroup-inline">
                                            <div className="p-field-checkbox">
                                                <Checkbox
                                                    inputId="finished"
                                                    value={values.finished}
                                                    onChange={() => setFieldValue('finished', !values.finished)}
                                                    checked={values.finished}
                                                />
                                                <label htmlFor="finished">Finished</label>
                                            </div>
                                            <div className="p-field-checkbox">
                                                <Checkbox
                                                    inputId="pinned"
                                                    value={values.pinned}
                                                    onChange={() => setFieldValue('pinned', !values.pinned)}
                                                    checked={values.pinned}
                                                />
                                                <label htmlFor="pinned">Pinned</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-d-flex p-jc-end">
                                    <Button
                                        className="p-button-outlined p-button-secondary p-mr-2"
                                        icon="pi pi-times"
                                        label="Cancel"
                                        onClick={onHide}
                                    />
                                    <Button
                                        icon="pi pi-check"
                                        label="Save task"
                                        onClick={handleSubmit}
                                    />
                                </div>
                            </>
                        )}
                    </Formik>
                )}
            </FirestoreMutation>
        </Dialog>
    )
}

