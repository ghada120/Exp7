var express = require('express')
  , bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(express.static('./'));
app.use(express.static(__dirname + "/views")); 
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
})); 


let courses = []
let students = []
let course_id = 0,student_id = 0

  
app.get('/api/courses/', function (req, res) {
  res.json({"courses":courses})
})

app.post('/api/courses/', function(req, res){
    new_course = req.body
    new_course['id'] = course_id
    course_id++
    courses.push(new_course)
    res.setHeader('Content-Type', 'application/json');
    res.json({"courses":courses})
});

app.delete('/api/courses/', function(req, res){
    i = courses.findIndex(course => course.id == req.body.id)
    courses.splice(i,1)
    res.json({"courses":courses})
    
});

app.put('/api/courses/', function(req, res){
    i = courses.findIndex(course => course.id == req.body.id)
    courses[i] = req.body
    res.json({"courses":courses})
});

app.get('/api/students/', function (req, res) {
    res.json({"students":students})
  })

app.post('/api/students/', function(req, res){
    new_student = req.body
    new_student['id'] = student_id
    student_id++
    students.push(new_student)
    res.setHeader('Content-Type', 'application/json');
    res.json({"students":students})
});

app.delete('/api/students/', function(req, res){
    i = students.findIndex(student => student.id == req.body.id)
    students.splice(i,1)
    res.json({"students":students})
    
});

app.put('/api/students/', function(req, res){
    i = students.findIndex(student => student.id == req.body.id)
    students[i] = req.body
    res.json({"students":students})
});

app.get("/web/students/create", function(req,res){
    res.render('students.ejs');
});

app.get("/web/courses/create", function(req,res){
    res.render('courses.ejs');
});


 
app.listen(process.env.PORT || 3000)