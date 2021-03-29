@echo off & setlocal EnableDelayedExpansion 

set a=106
for /f "delims=" %%i in ('dir /b *') do (
  if not "%%~nxi"=="%~nx0" (
    ren "%%i" "!a!.jpg" 
    set /a a+=1
 ) 
)