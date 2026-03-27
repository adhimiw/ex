# Full Exam Code Series (Monday Prep)

This folder gives reusable answers for your listed questions. Many questions are repeated in concept, so one code file is mapped to multiple question numbers.

## 1) HTML/CSS/JS Web + Events + Date/Math

- Multi-section responsive startup site:
  - `frontend/multi-section-site/index.html`
  - `frontend/multi-section-site/styles.css`
  - `frontend/multi-section-site/script.js`
- Event handling + event pair comparisons:
  - `frontend/events-demo/events.html`
  - `frontend/events-demo/events.js`
- Date and Math object demos:
  - `frontend/events-demo/date-math-demo.js`
  - `frontend/events-demo/math-compare.js`

## 2) React Questions

- Calculator: `frontend/react-examples/Calculator.jsx`
- Voting app: `frontend/react-examples/VotingApp.jsx`
- Counter app: `frontend/react-examples/CounterApp.jsx`
- Todo app: `frontend/react-examples/TodoApp.jsx`
- Functional component student info: `frontend/react-examples/StudentInfo.jsx`
- JSX heading + paragraph + subjects list: `frontend/react-examples/JSXLayout.jsx`

## 3) Node.js fs / Timers / Events / Async callback

- Read file async: `node/fs-and-timers/read-file-async.js`
- Sample input file: `node/fs-and-timers/sample.txt`
- Non-blocking setTimeout: `node/fs-and-timers/non-blocking-settimeout.js`
- Date/time every 2 sec for 5 times: `node/fs-and-timers/date-time-interval-5-times.js`
- CLI name -> write welcome.txt: `node/fs-and-timers/cli-name-write-welcome.js`
- Custom events module demo: `node/fs-and-timers/custom-event-demo.js`
- Async addition callback: `node/fs-and-timers/async-addition-callback.js`

## 4) Express Questions

- GET /students JSON API: `node/express/students-api.js`
- Query string username API: `node/express/query-username.js`
- Install deps in this folder first:
  - `cd node/express`
  - `npm install`

## 5) MongoDB + Node Questions

- Connect success message: `node/mongodb/mongo-connect.js`
- CRUD with MongoDB driver: `node/mongodb/mongo-crud.js`
- Express + Mongoose insert/retrieve students: `node/mongodb/mongo-student-server.js`
- Express + Mongo driver full CRUD routes: `node/mongodb/mongo-server-crud.js`
- Mongo shell commands: `notes/mongo-shell-commands.txt`
- Install deps in this folder first:
  - `cd node/mongodb`
  - `npm install`

## 6) Mapping to Your Question List

- Q2(a): multi-section site
- Q2(b), Q18(b): date-math-demo.js
- Q3(a), Q19(a): events.js
- Q3(b), Q4(bullet compare): math-compare.js
- Q4(a): event pairs in events.js + events.html
- Q4(b), Q5(b): read-file-async.js + sample.txt
- Q5(a), Q20(a): Calculator.jsx
- Q6(a): query-username.js
- Q6(b): non-blocking-settimeout.js
- Q7(a): VotingApp.jsx
- Q7(b): cli-name-write-welcome.js
- Q8(a): CounterApp.jsx
- Q8(b): custom-event-demo.js
- Q9(a), Q10(a): TodoApp.jsx
- Q9(b), Q20(b): date-time-interval-5-times.js
- Q10(b): async-addition-callback.js
- Q11(a), Q12(a), Q14(a), Q17(b): mongo-connect.js / mongo-student-server.js
- Q11(b), Q12(b), Q19(b): students-api.js
- Q13(a), Q15(a), Q16(a), Q17(a): mongo-crud.js or mongo-server-crud.js
- Q13(b), Q14(b): StudentInfo.jsx
- Q15(b): JSXLayout.jsx
- Q16(b): mongo-shell-commands.txt
- Q18(a): use your existing root form files (`index.html`, `styles.css`, `script.js`)

## 7) Fast Exam Explanation Tips

- `Math.round(x)`: nearest integer.
- `Math.ceil(x)`: always up.
- `Math.floor(x)`: always down.
- `keydown` fires when key is pressed; `keyup` fires when released.
- `mouseover` triggers when entering element and children; `mouseenter` only when entering that element.
- `click` is single click, `dblclick` is double click.
- Node is non-blocking: async tasks run later while next lines execute immediately.

