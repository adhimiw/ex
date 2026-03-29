@echo off
echo Starting all 8 React projects...

start "react-calculator   :3001" cmd /k "cd /d d:\fullstack\react-projects\react-calculator && set PORT=3001 && npm start"
start "react-counter       :3002" cmd /k "cd /d d:\fullstack\react-projects\react-counter && set PORT=3002 && npm start"
start "react-jsx-display   :3003" cmd /k "cd /d d:\fullstack\react-projects\react-jsx-display && set PORT=3003 && npm start"
start "react-list-map      :3004" cmd /k "cd /d d:\fullstack\react-projects\react-list-map && set PORT=3004 && npm start"
start "react-student-details :3005" cmd /k "cd /d d:\fullstack\react-projects\react-student-details && set PORT=3005 && npm start"
start "react-student-management :3006" cmd /k "cd /d d:\fullstack\react-projects\react-student-management && set PORT=3006 && npm start"
start "react-todo          :3007" cmd /k "cd /d d:\fullstack\react-projects\react-todo && set PORT=3007 && npm start"
start "react-voting        :3008" cmd /k "cd /d d:\fullstack\react-projects\react-voting && set PORT=3008 && npm start"

echo.
echo All projects launched in separate windows:
echo   react-calculator        http://localhost:3001
echo   react-counter           http://localhost:3002
echo   react-jsx-display       http://localhost:3003
echo   react-list-map          http://localhost:3004
echo   react-student-details   http://localhost:3005
echo   react-student-management http://localhost:3006
echo   react-todo              http://localhost:3007
echo   react-voting            http://localhost:3008
