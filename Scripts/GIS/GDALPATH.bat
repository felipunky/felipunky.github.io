@echo off
set /p architecture= "64 or 32 architecture? Type 64 for 64x, 32 for 32x "
if %architecture% == 64 (
    echo 64 architecture
    for /F "usebackq skip=2 tokens=2*" %%A IN (`reg query "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment" /v Path`) do (reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment" /f /v Path /t REG_SZ /d "%%B;C:\Program Files\GDAL")
    setx GDAL_DATA "C:\Program Files\GDAL\gdal-data" /M
    setx GDAL_DRIVER_PATH "C:\Program Files\GDAL\gdalplugins" /M
) else if %architecture% == 32 (
    echo 32 architecture
    for /F "usebackq skip=2 tokens=2*" %%A IN (`reg query "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment" /v Path`) do (reg add "HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment" /f /v Path /t REG_SZ /d "%%B;C:\Program Files (x86)\GDAL")
    setx GDAL_DATA "C:\Program Files (x86)\GDAL\gdal-data" /M
    setx GDAL_DRIVER_PATH "C:\Program Files (x86)\GDAL\gdalplugins" /M
) else (
    echo Enter a valid input 32 or 64!
)
pause
