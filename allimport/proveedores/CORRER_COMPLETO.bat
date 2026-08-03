@echo off
chcp 65001 >nul
echo ============================================
echo   All Import - Analizador COMPLETO
echo ============================================
echo.
echo Leyendo TODO: cada foto = un producto.
echo (con los grupos grandes tarda un poco, no cierres)
echo.
python "%~dp0analizar_completo.py"
pause
