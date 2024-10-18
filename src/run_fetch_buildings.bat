@echo off
REM Change directory to the src folder
cd "C:\Users\Admin\Documents\hack4pwd-main\src" 

REM Check if the virtual environment's Python executable exists
IF NOT EXIST "C:\Users\Admin\Documents\hack4pwd-main\venv\Scripts\python.exe" (
    echo Python executable not found. Please check your virtual environment setup.
    pause
    exit /b
)

REM Run the fetch_buildings.py script using the virtual environment's Python
"C:\Users\Admin\Documents\hack4pwd-main\venv\Scripts\python.exe" fetch_buildings.py

REM Pause the command window to view output
pause
