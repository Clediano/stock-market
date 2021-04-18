import React, { Component } from 'react';

import autoBind from "react-autobind";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { confirmPopup } from 'primereact/confirmpopup';

import { FirestoreCollection } from "@react-firebase/firestore";


import { converterServerToForm } from './service';
import { completeTask, deleteTask, pinOrUnpinTask, uncompleteTask } from './service';

import { FormDialog } from './components/FormDialog';
import { TaskList } from './components/TaskList';

class TodoPage extends Component {

    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            isModalFormVisible: false,
            itemSelected: null
        }
    }

    confirm(event, onSuccess, onReject) {
        confirmPopup({
            target: event.currentTarget,
            message: "Are you sure you want to delete this task?",
            icon: 'pi pi-exclamation-triangle',
            accept: onSuccess,
            reject: onReject
        });
    }

    completeTask(task) {
        completeTask(task);
    }

    updateTask(task) {
        this.setState({ itemSelected: task, isModalFormVisible: true })
    }

    uncompleteTask(task) {
        uncompleteTask(task);
    }

    deleteTask(task, event) {
        this.confirm(event, () => deleteTask(task))
    }

    pinOrUnpinTask(task) {
        pinOrUnpinTask(task)
    }

    loadTasksPerStatus(tasks = [], ids = []) {
        let result = { pending: [], completed: [] };

        converterServerToForm(tasks, ids)
            .forEach(task => {
                if (task.finished) {
                    result.completed.push(task)
                } else {
                    result.pending.push(task)
                }
            })
        return result;
    }

    render() {
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
                    <FirestoreCollection path="/tasks">
                        {({ value = [], ids, isLoading }) => {
                            const { pending, completed } = this.loadTasksPerStatus(value, ids);
                            return (
                                <>
                                    <div className="p-col-12">
                                        <Card
                                            className="p-shadow-24"
                                            title="Your pending tasks"
                                            subTitle="You can check the tasks clicking on Check button"
                                        >
                                            <TaskList
                                                isLoading={isLoading}
                                                tasks={pending}
                                                completeTask={this.completeTask}
                                                updateTask={this.updateTask}
                                                deleteTask={this.deleteTask}
                                                pinOrUnpinTask={this.pinOrUnpinTask}
                                            />
                                        </Card>
                                    </div>
                                    <div className="p-col-12">
                                        <Card
                                            className="p-shadow-24"
                                            title="Your completed tasks"
                                            subTitle="Congratulations, you complete these tasks"
                                        >
                                            <TaskList
                                                completedTasks
                                                isLoading={isLoading}
                                                tasks={completed}
                                                uncompleteTask={this.uncompleteTask}
                                                updateTask={this.updateTask}
                                                deleteTask={this.deleteTask}
                                                pinOrUnpinTask={this.pinOrUnpinTask}
                                            />
                                        </Card>
                                    </div>
                                </>
                            )
                        }}
                    </FirestoreCollection>
                </div>
                <FormDialog
                    visible={this.state.isModalFormVisible}
                    onHide={() => this.setState({ isModalFormVisible: false, itemSelected: null })}
                    itemSelected={this.state.itemSelected}
                />
            </>
        );
    }
}
export default TodoPage;
