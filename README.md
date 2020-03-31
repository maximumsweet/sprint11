# Яндекс.Практикум
## Проектная работа 11 *v1.0.1*
## Webpack
### Краткая информация о проекте
Изучение сборки кода с помощью сборщика Webpack и библиотеки пакетов NPM.
В работе используется программа-сборщик Webpack и библиотека пакетов NPM для сборки кода проекта "Место" и публикации на сервере gh-pages.
Актуальная версия проекта *(v1.0.1)* доступна по этой [ссылке](https://maximumsweet.github.io/sprint11/)
###  ПО для выполнения работы:
- Git
- Node.js
- Webpack
- NPM-пакеты:
#### сборка develop
@babel/cli @babel/core @babel/preset-env autoprefixer babel-loader cross-env css-loader cssnano file-loader gh-pages html-loader html-webpack-plugin@3.2.0 image-webpack-loader lodash mini-css-extract-plugin postcss-loader resolve-url resolve-url-loader style-loader url-loader webpack webpack-cli webpack-dev-server webpack-md5-hash
#### сборка build:
babel-polyfill core-js optimize-css-assets-webpack-plugin resolve-cwd
### Инструкция по сборке:
- точка входа: index.js
- команда npm run build запускает сборку build и собирает проект в папке dist
- команда npm run dev запускает сборку develop и открывает проект на локальном сервере по адресу localhost:8080
- команда npm run deploy развёртывает проект на сервере gh-pages
### Результат проектной работы:
- Репозиторий Git состоит из веток master и develop
- Webpack и NPM использован для сборки кода
- CSS-код минимизирован, JS-код переведен бабелем из ES6 в ES5, оптимизированы картинки и шрифты
- Сайт проекта "Место" опубликован на хостинге gh-pages
