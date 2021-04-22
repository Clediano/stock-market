import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import { Column } from 'primereact/column';

export const SkeletonTable = () => {
    return (
        <DataTable value={new Array(5)} className="p-datatable-striped">
            <Column
                field="date"
                header="Date"
                body={() => <Skeleton />}
            />
            <Column
                field="title"
                header="Title"
                body={() => <Skeleton />}
            />
            <Column
                field="description"
                header="Description"
                body={() => <Skeleton />}
            />
            <Column
                field="finished"
                header="Finished"
                body={() => <Skeleton />}
            />
            <Column
                field="pinned"
                header="Pinned"
                body={() => <Skeleton />}
            />
        </DataTable>
    )
}
