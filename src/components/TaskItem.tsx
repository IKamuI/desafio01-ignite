import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task, EditTask } from './TasksList';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

interface TaskItem {
    index: number;
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (editTask: EditTask) => void;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItem) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>(task.title);
    const textInputRef = useRef<TextInput>(null)

    function createEditTask(): EditTask {
        const editeTask: EditTask = {
            taskId: task.id,
            taskNewTitle: editedTitle
        }
        return editeTask;
    }

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setEditedTitle(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {

        editTask(createEditTask())
        setIsEditing(false);
    }


    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={editedTitle}
                        onChangeText={setEditedTitle}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={styles.iconContainer}
            >
                {isEditing ? (
                    <TouchableOpacity
                    onPress={handleCancelEditing}

                    >
                        <Icon name="x" size={24} color="#b2b2b2"/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                    onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )

                }
                <Text style={{color:'#C4C4C4', fontSize:16}}> | </Text>
                <TouchableOpacity
                    disabled={isEditing}
                    style={{opacity: isEditing ? 0.4 : 1}}
                    testID={`trash-${index}`}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24

    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})