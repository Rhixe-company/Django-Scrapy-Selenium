@ECHO OFF


set COMPOSEEXEC=docker compose
set COMPOSEFILE=./docker-compose.local.yml


:compose_daemon:
%COMPOSEEXEC% -f %COMPOSEFILE% up -d

:compose_build:
%COMPOSEEXEC% -f %COMPOSEFILE% build

:compose_logs:
%COMPOSEEXEC% -f %COMPOSEFILE% logs -f

:compose_down:
%COMPOSEEXEC% -f %COMPOSEFILE% down --remove-orphans -t 0
