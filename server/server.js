const express = require("express")
const mongoose = require("mongoose")
const brain = require('brain.js')
const cors = require("cors")
const {default: axios } = require('axios')
const app = express()
app.use(express.json())
app.use(cors({origin:true}))
require('dotenv').config()
const data = require('./data/trainData.json')
const UserModel = require('./models/Users')
const ProjectModel = require('./models/Projects')
const TodoModel = require('./models/Todos')
const MeetingModel = require('./models/Meetings')
mongoose.connect(process.env.DATABASE_ENDPOINT);

const network = new brain.recurrent.LSTM()
const trainData = data.map(item => ({
    input: item.text,
    output: item.grade
}))
network.train(trainData, {
    iterations: 300
})

//register 
app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {username, password} = req.body
    UserModel.findOne({username: username})
    .then(async user => {
        if (user){
            if (user.password == password){
                const api_key = process.env.CHATENGINE_PRIVATE_KEY
                try {
                    const chatRes = await axios.put("https://api.chatengine.io/users/", 
                        {username: username, secret: password, first_name: username},
                        {headers: { "Private-key": api_key} }
                    )
                    const plainUser = user.toObject();
                    user = {...plainUser, chatEngineSecret: chatRes.data.secret, chatEngineProjectId: process.env.CHATENGINE_PROJECT_ID }
                    return res.status(chatRes.status).json({ code: "Success", user: user })
                } catch (error) {
                    return res.status(error.response.status).json(error.response.data)
                }
            } 
            return res.json({ code: "Incorrect password" });
        }
        res.json({ code: "User is not found!"})
    })
    .catch(err => res.json(err))
})


//projects create
app.post('/create', (req, res) => {
    ProjectModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//return projects
app.get('/projects', (req,res) => {
    const {userId} = req.query
    ProjectModel.find({projectUsers: userId})
    .then(projects => {
        return res.json(projects)
    })
    .catch(err => res.json(err))
})

//add user into project
app.post('/project/add', (req,res) => {
    const {userId, projectId} = req.body

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.json('Wrong format for Project ID!');
    }

    ProjectModel.findById(projectId)
    .then(project => {
        if (!project){
            return res.json('Project does not exist!')
        }
        project.projectUsers.push(userId);
        project.save()
        return res.json('Success')
    })
    .catch(err => res.json(err))
})


//remove user from project
app.post('/project/remove', (req,res) => {
    const {userId, projectId} = req.body
    ProjectModel.findById(projectId)
    .then(project => {
        project.projectUsers = project.projectUsers.filter(id => id.toString() !== userId);
        project.save()
        return res.json('Success')
    })
    .catch(err => {
        return res.json(err)
    })
})

//create todo
app.post('/todo', (req,res) => {
    const {task, projectId} = req.body
    TodoModel.findOne({ projectId })
        .then(todolist => {
            if (!todolist) {
                return TodoModel.create({ projectId: projectId, todos: [task] });
            } else {
                todolist.todos.push(task);
                return todolist.save();
            }
        })
        .then(updatedTodolist => {
            return res.json(updatedTodolist);
        })
        .catch(err => {
            return res.json(err);
        });
})

//get todos
app.get('/todos', (req,res) => {
    const {projectId} = req.query
    TodoModel.findOne({ projectId })
        .then(todolist => {
            if (todolist){
                return res.json(todolist.todos)
            }
            return res.json([])
        })
        .catch(err => {
            return res.json(err);
        });
})

//delete todos
app.post('/todos/delete', (req,res) => {
    const {task, projectId} = req.body
    TodoModel.findOne({ projectId })
        .then(todolist => {
            todolist.todos = todolist.todos.filter(todo => todo !== task);
            return todolist.save()
        })
        .then(updatedTodolist => {
            return res.json(updatedTodolist);
        })
        .catch(err => {
            return res.json(err);
        });
})

//create meetings
app.post('/meeting', (req,res) => {
    MeetingModel.create(req.body)
    .then(meetings => res.json(meetings))
    .catch(err => res.json(err))
})

//get all the meetings
app.get('/meetings', (req,res) => {
    const {projectId} = req.query
    MeetingModel.find({ projectId })
        .then(meetings => {
            return res.json(meetings)
        })
        .catch(err => {
            return res.json(err);
        });
})

//delete todos
app.post('/meeting/delete', (req,res) => {
    const {name, projectId} = req.body
    MeetingModel.deleteOne({ projectId, name })
        .then(result => {
            return res.json(result);
        })
        .catch(err => {
            return res.json(err);
        });
})


//paraphrase API call
app.post('/paraphrase', async (req,res) => {
    const {text} = req.body
    let jobId;

    const options = {
      method: 'POST',
      url: process.env.RAPID_PARAPHRASING_URL,
      params: {
        text: text,
        unique: '1',
        mode: 'fluent'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_PARAPHRASING_HOST
      }
    };

    try {
        const response = await axios.request(options);
        jobId = response.data.job_id
    } catch (error) {
        return res.json(error)
    }

    await new Promise(resolve => setTimeout(resolve, 10000));

    const options_retrieve = {
        method: 'POST',
        url: process.env.RAPID_PARAPHRASING_URL_RETRIEVE,
        params: {
          job_id: jobId
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': process.env.RAPID_PARAPHRASING_HOST
        }
      };
      
      try {
          const response1 = await axios.request(options_retrieve);
          return res.json(response1.data.text)
      } catch (error) {
        return res.json(error)
      }

})

//plagiarism check API call
app.post('/plagiarism', async (req,res) => {

    const {text} = req.body
    const encodedParams = new URLSearchParams();
    encodedParams.set('content',  text);

    const options = {
    method: 'POST',
    url: process.env.RAPID_PLAGIARISM_URL,
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_PLAGIARISM_HOST
    },
    data: encodedParams
    };
    
    try {
        const response = await axios.request(options);
        return res.json(response.data)
    } catch (error) {
        return res.json(error)
    }
})

//grade prediction
app.post('/prediction', (req, res) => {
    const {text} = req.body
    const output = network.run(text)
    return res.json(output)
})



app.listen(2000, ()=>{
    console.log("Server running on port: 2000!")
})