set path=%~d0%~p0

"%path%pngquant.exe" --skip-if-larger --strip --force --verbose --quality=80-80 --output %1 %1