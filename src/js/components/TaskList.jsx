import React from "react";
import Tasks from "./Tasks";



function TaskList({tasks, onDelete}){
//he de reconocer que acabo de terminar a las dos de la mañana puesto no conseguia que se viera
//y al preguntarle al chat me solucionó que tasks y onDeletetenia que pasarlo como props. y era eso

    return (
        <div>
        <h2>Esto es la lista de tareas</h2>
        <div>
            {tasks.map((task, index) => (
                <Tasks key={index} task={task} onDelete = {onDelete} />
            ))}
        </div>
{/* sadasaqui simplemente con el map para que recorra la arry y genere la lista de todolistpasandole los props de las taks y el delete para que se actualice */}
    </div>
    )
}

export default TaskList;