# start-all.ps1 — Launch all 8 React projects on different ports

$projects = @(
    @{ name = "react-calculator";          port = 3001 },
    @{ name = "react-counter";             port = 3002 },
    @{ name = "react-jsx-display";         port = 3003 },
    @{ name = "react-list-map";            port = 3004 },
    @{ name = "react-student-details";     port = 3005 },
    @{ name = "react-student-management";  port = 3006 },
    @{ name = "react-todo";                port = 3007 },
    @{ name = "react-voting";              port = 3008 }
)

$root = "d:\fullstack\react-projects"

foreach ($p in $projects) {
    $dir  = Join-Path $root $p.name
    $port = $p.port
    $title = "$($p.name) :$port"

    Start-Process powershell -ArgumentList `
        "-NoExit", "-Command", `
        "& { `$env:PORT='$port'; Set-Location '$dir'; npm start }" `
        -WindowStyle Normal
    
    Write-Host "Started $($p.name) on http://localhost:$port"
}

Write-Host ""
Write-Host "All 8 projects launched:"
foreach ($p in $projects) {
    Write-Host "  $($p.name.PadRight(28)) http://localhost:$($p.port)"
}
