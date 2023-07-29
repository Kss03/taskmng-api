const formDOM = document.querySelector('.create-task')
const formInputDOM = document.querySelector('.task-create__input')
const tasksListsDOM = document.querySelector('.tasks-list')

//post new task
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = formInputDOM.value
  console.log(name)

  try {
    await axios.post('/api/v1/tasks', {name})
    loadTasks()
  } catch (error) {
    console.log(error)
  }
})

//get all tasks
const loadTasks = async () => {
  try {
    const {
      data: {tasks},
    } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      tasksListsDOM.innerHTML = '<h5>No tasks in your list</h5>'
      return
    }
    const allTasks = tasks.map((task) => {
      const {completed, _id, name} = task
      return (
        `<div class="one-task ${completed && 'completed'}">
          <h5>
            ${name}
          </h5>
          <div class="d-flex">
            <span>ID: ${_id}</span>
            <button class="btn del-btn" value="${_id}">delete</button>
            <button class="btn complete-btn" value="${_id}" data-completed="${completed}">${!completed ? 'I DID IT' : "I Didn't it"}</button>
          </div>
        </div>`
      )
    }).join('')
    tasksListsDOM.innerHTML = allTasks
  } catch(error) {
    console.log(error)
  }
}

loadTasks()

const deleteTask = async (el) => {
  const id = el.value
  try {
    await axios.delete(`api/v1/tasks/${id}`)
    loadTasks()
  } catch (error) {
    console.log(error)
  }
}

const editTask = async (el) => {
  const id = el.value
  const completed = el.dataset.completed === "true" ? true : false
  
  try {
    await axios.patch(`/api/v1/tasks/${id}`, {
      completed: !completed
    })
    loadTasks()
  } catch (error) {
    console.log(error)
  }
}

tasksListsDOM.addEventListener('click', async (e) => {
  const el = e.target

  //delete task 
  if (el.classList.contains('del-btn')) {
    await deleteTask(el)
  }

  //edit task 
  if (el.classList.contains('complete-btn')) {
    await editTask(el)
  }
})

