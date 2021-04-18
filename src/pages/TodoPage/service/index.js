import { addSeconds } from 'date-fns';
import firebase from 'firebase';

export async function deleteTask(task, onSuccess, onError) {
    const database = firebase.firestore();
    database.collection("/tasks").doc(task?.id).delete()
        .then(onSuccess && onSuccess())
        .catch(onError && onError());
}

export async function completeTask(task, onSuccess, onError) {
    const database = firebase.firestore();
    database.collection("/tasks").doc(task?.id).set({ ...task, finished: true })
        .then(onSuccess && onSuccess())
        .catch(onError && onError());
}

export async function uncompleteTask(task, onSuccess, onError) {
    const database = firebase.firestore();
    database.collection("/tasks").doc(task?.id).set({ ...task, finished: false })
        .then(onSuccess && onSuccess())
        .catch(onError && onError());
}

export function pinOrUnpinTask(task, onSuccess, onError) {
    const database = firebase.firestore();
    database.collection("/tasks").doc(task?.id).set({ ...task, pinned: !task.pinned })
        .then(onSuccess && onSuccess())
        .catch(onError && onError());
}

export function converterServerToForm(tasks, ids) {
    if (!tasks) return []

    return tasks.map((item, index) => ({
        ...item,
        dateToFinish: addSeconds(new Date(0), item.dateToFinish.seconds),
        id: ids[index]
    }));
}
