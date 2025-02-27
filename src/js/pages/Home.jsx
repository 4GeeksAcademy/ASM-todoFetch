import React, { useState, useEffect } from "react";
import Taskform from "../components/TaskForm";
import TaskList from "../components/TaskList";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState([]);
	const API_URL = "https://playground.4geeks.com/todo";
	const ID_USER = "Angel_SM";
	// vale, en general empiezo estableciendo un useState de un array vacio, ya que es lo que buscamos aqui, una lista de tareas, un array de objetos, abajo justo
	// creo una función donde establezca el objeto con un titulo, y una id y si está realizada (aunque despues no use ese dato la verdad).

	useEffect(() => {
		fetchTareas()
	}, []);

	const fetchTareas = async () => {
		try {
			const response = await fetch(`${API_URL}/users/${ID_USER}`);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			setTasks(data.todos);
		} catch (error) {
			console.error("Hubo un problema con la solicitud:", error);
		}
	};
	//vaya problema nos surgio a JAvi y a mi con el GET pq en Task tengo puesto title y todo se soluciono cambiando el title de componente a (label:title)

	const addTasks = async (title) => {
		const newTask = {
			label: title,
			id: Date.now(),
			is_done: false,
		};

		try {
			const response = await fetch(`${API_URL}/todos/${ID_USER}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTask),
			});

			if (!response.ok) {
				throw new Error(`Error HTTP! Estado: ${response.status}`);
			}

			const addedTask = await response.json();
			setTasks((prevTasks) => [...prevTasks, addedTask]);
		} catch (error) {
			console.error("Error al agregar tarea:", error);
		}
	};


	const handleDelete = async (taskId) => {
		try {
			const response = await fetch(`${API_URL}/todos/${taskId}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Error HTTP! Estado: ${response.status}`);
			}
			setTasks((prevtasks) => prevtasks.filter(task => task.id !== taskId));
		} catch (error) {
			console.error("Hubo un problema al eliminar la tarea:", error.message);
		}
	}

	const clearAllTask = async () => {
		try {
			const response = await fetch(`${API_URL}/users/${ID_USER}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Error HTTP! Estado: ${response.status}`);
			}
			setTasks([]);			
		} catch (error) {
			console.error("Hubo un problema al eliminar las tareas:", error.message);
		}
	}
	//vale aqui me costo impolementar el limpiar toas las ttareas pq la rua al menos que me funciona es esta y no la de todos/task.id pq eniendo que asi elimina odo lo que esta denro del usuario
	// una simple fuinción .filter para que borre la tarea cuando la queramos eliminar 
	return (
		<>
			<div className="container mt-4">
				<h1 className="mb-4">  Gestor de tareas</h1>
				<Taskform onAddTask={addTasks} />
				<TaskList tasks={tasks} onDelete={handleDelete} />
				<button className="btn btn-danger mb-3" onClick={clearAllTask}>
					Limpiar todas las tareas
				</button>
			</div>
		</>
	);
}

export default Home

//y por ultimo he consultado el chat principalmente pq con los props me cuesta mucho aun de oasarlo al padre y de este al hijo y asi sobre todo la manera de 
// escribirlo que a veces van con prop. y otras veces {} bueno, que pediré me ntoría ya que es un campo que de especial me está constando