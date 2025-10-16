@echo off
echo Running Momo Dukan Test Suite...
echo.

echo ================================
echo    FRONTEND TESTS
echo ================================
echo.
npm test -- --watchAll=false --coverage

echo.
echo ================================
echo     BACKEND TESTS  
echo ================================
echo.
cd server
npm test -- --coverage
cd ..

echo.
echo ================================
echo    TEST SUMMARY COMPLETE
echo ================================
echo.
pause