# General description

Quizz is a trivia quiz website that creates quiz questions based on user-selected settings. The questions are sourced from the [Open Trivia Database API](https://opentdb.com/api_config.php). The website is built with React and Bootstrap, and it saves previous quiz configurations using local storage. It uses [Llama AI](https://llama.meta.com/) to generate custom answer explanations for users and uses Express for backend to host a web server.

# Running the project

1. Website is available in the following link: [GitHub pages, no AI](https://lucy-c1.github.io/Trivia-App/) or [Glitch, has AI](https://ai-trivia-app-1.glitch.me/). You may need to wait a while for Glitch to start.
2. Install the dependencies and run the project

In frontend and backend folder:

```
npm install
```

In root:

```
npm run start
```

# Project workflow

- Created initial project design using Figma. [Figma design here](https://www.figma.com/design/exdvvRFGgPJd8VBOQ4EuXA/Quizz?node-id=0-1&m=dev&t=74tJrKyYoS2V38Rt-1)
- Planned the main components of the project using github issues
- Drew a [State tree](https://github.com/user-attachments/assets/9792b2d8-eee1-46ef-bd83-5ac28e216a70) to plan the interactions between the parent and child components.
- Added responsiveness to the website using media queries.
- Included AI to generate custom answer explanation when the user requests it and to ensure security of my api key, created a backend server
