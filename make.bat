@echo off
@rem #"Makefile" for Windows projects.
@rem #Copyright (c) vivi, 2019. All rights reserved.
@rem
SETLOCAL

@rem ###############
@rem # PRINT USAGE #
@rem ###############

if [%1]==[] goto usage

@rem ################
@rem # SWITCH BLOCK #
@rem ################

@rem # make dev
if /I [%1]==[dev] goto dev

@rem # make pro
if /I [%1]==[pro] goto pro

@rem # make beta
if /I [%1]==[beta] goto beta

@rem # make run
if /I [%1]==[run] goto run

goto :eof

@rem #############
@rem # FUNCTIONS #
@rem #############
:dev
set NODE_ENV=development
npm run build
exit /B %ERRORLEVEL%

:pro
set NODE_ENV=production
npm run build
exit /B %ERRORLEVEL%

:beta
set NODE_ENV=production
set BUILD_TYPE=beta
npm run build
exit /B %ERRORLEVEL%

:run
npm run dev
exit /B %ERRORLEVEL%

:usage
@echo Usage: %0 ^[ dev ^| pro ^| beta ^| run ^]
exit /B 1