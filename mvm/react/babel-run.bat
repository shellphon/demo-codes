@echo on
set base_dir=%~dp0
%base_dir:~0,2%
pushd %base_dir%

babel src -d build -w

pause