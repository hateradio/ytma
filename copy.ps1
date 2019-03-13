# .\node_modules\.bin\grunt.cmdf

$fsw = New-Object IO.FileSystemWatcher
$fsw.Path = $pwd.Path
$fsw.Filter = "*.js"
$fsw.EnableRaisingEvents = $true

$copyme = {Copy-Item "$PSScriptRoot\ytma.user.js" "C:\Users\theories\AppData\Roaming\Mozilla\Firefox\Profiles\r4of0be4.default-1507611860771\gm_scripts\YouTube_Me_Again!\ytma.user.js"}

Register-ObjectEvent $fsw "Changed" -Action $copyme

while ($true) {
    Start-Sleep -Milliseconds 100
}
