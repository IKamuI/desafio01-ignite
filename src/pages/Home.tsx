import React, { useState } from 'react';
import { Alert, AlertButton, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import {Task, EditTask ,TasksList } from '../components/TasksList';
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
    const foundTaks = tasks.find(task => task.title === newTaskTitle);
    
    if(!foundTaks)
    {
      setTasks(oldState => [...oldState, createTask(newTaskTitle)]);
      return;
    }

    Alert.alert('Task já cadastrada',
    'Você não pode cadastar uma task com o mesmo nome.',
    );
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(({id:taskId ,done ,...rest}) => ( {id:taskId, done: id === taskId ? !done : done, ...rest} ));
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item',
    'tem certeza que deseja remover esse item?',
    [
      {
        text: "Não",
      },
      {
        text: "Sim",
        onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)),
      }
    ]);
  }

  function handleEditTask(editTask: EditTask)
  {
    const updatedTasks = tasks.map(({id:taskId ,title ,...rest}) => ( {
      id: taskId,
      title: editTask.taskId === taskId ? editTask.taskNewTitle : title,
      ...rest
      } 
    ));
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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