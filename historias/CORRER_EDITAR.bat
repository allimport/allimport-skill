@echo off
chcp 65001 >nul
echo ============================================
echo   All Import - Editor de fotos para historias
echo ============================================
echo.
echo Instalando lo necesario (solo la 1ra vez)...
python -m pip install --quiet Pillow
echo.
python "%~dp0editar_fotos.py"
pause
