import React from 'react';

import { SkeletonTable } from './SkeletonTable';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { formatDate } from '../../../utilities/formatters';

import pendingImage from '../images/pending.svg';
import finishedImage from '../images/finished.svg';

export const TaskList = props => {

    const bodyPinnedTemplate = item => {
        return (
            <Button
                icon={item.pinned ? "pi pi-circle-on" : "pi pi-circle-off"}
                className="p-button-rounded p-button-text"
                tooltip={item.pinned ? "Click to unpin this task" : "Click to pin this task"}
                tooltipOptions={{ position: "left" }}
                onClick={() => props.pinOrUnpinTask(item)}
            />
        )
    }

    const bodyActionTemplate = item => {
        return (
            <>
                {item.finished ? (
                    <Button
                        icon="pi pi-replay"
                        className="p-button-rounded p-button-success p-button-text"
                        tooltip="Click to uncomplete this task"
                        tooltipOptions={{ position: "left" }}
                        onClick={() => props.uncompleteTask(item)}
                    />
                ) : (
                    <Button
                        icon="pi pi-check-circle"
                        className="p-button-rounded p-button-success p-button-text"
                        tooltip="Click to finish this task"
                        tooltipOptions={{ position: "left" }}
                        onClick={() => props.completeTask(item)}
                    />
                )}
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text"
                    tooltip="Click to edit this task"
                    tooltipOptions={{ position: "left" }}
                    onClick={() => props.updateTask(item)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-button-text"
                    tooltip="Click to delete this task"
                    tooltipOptions={{ position: "left" }}
                    onClick={event => props.deleteTask(item, event)}
                />
            </>
        );
    }

    const groupHeaderTemplate = numberOfTasks => {
        return (
            <div className="p-d-flex p-ai-center">
                <Avatar
                    className="p-overlay-badge p-mx-2"
                    image={props.completedTasks ? finishedImage : pendingImage}
                >
                    {numberOfTasks > 0 && <Badge value={numberOfTasks} severity={props.completedTasks ? "success" : "warning"} />}
                </Avatar>
                <p className="p-text-bold">
                    {props.completedTasks ? "Completed Tasks" : "Pending Tasks"}
                </p>
            </div>
        )
    }

    const emptyMessageTemplate = () => {
        return <p className="p-text-center">No task found</p>
    }

    if (props.isLoading) {
        return <SkeletonTable />
    }

    return (
        <DataTable
            value={props.tasks.sort((a, b) => b.pinned - a.pinned)}
            autoLayout
            header={groupHeaderTemplate(props.tasks.length)}
            emptyMessage={emptyMessageTemplate}

        >
            <Column
                field="pinned"
                body={bodyPinnedTemplate}
            />
            <Column
                field="dateToFinish"
                header="Finish at"
                body={item => formatDate(item.dateToFinish)}
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
                body={bodyActionTemplate}
                bodyClassName="p-text-right"
            />
        </DataTable>
    )
}
