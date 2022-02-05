import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import {Task ,TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function createTask(newTaskTitle: string): Task
  {
     const task: Task = {
      title: newTaskTitle,
      id: new Date().getTime(),
      done: false
    }

    return task;
  }

  function handleAddTask(newTaskTitle: string) {
    setTasks(oldState => [...oldState, createTask(newTaskTitle)]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(({id:taskId ,done ,...rest}) => ( {id:taskId, done: id === taskId ? !done : done, ...rest} ));
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})