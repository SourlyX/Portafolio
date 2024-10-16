import React, { useRef, useState }from "react"
import Navbar from "./Navbar"
import Container from "./Container"
import Footer from "./Footer"
import styled from "styled-components"
import About from "./About"
import Contact from "./Contact"
import PageNotFound from "./NotFound"
import LandingPage from "./Me"
import ToDoList from "./Todo/ToDoList"
import Restarurante from "./Restaurante/Restaurante"
import "./index.css"
import { Helmet } from "react-helmet"
import { Routes, Route } from "react-router-dom"

const MainApp = styled.div`
  color: #E0E0E0;
  background-color: #282C34;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`


function App() {

  const contactRef = useRef(null)

  const cards = [
    {
      image: "https://example.com/image1.jpg",
      title: "Título de la tarjeta 1",
      description: "Descripción de la tarjeta 1"
    },
    {
      image: "https://example.com/image2.jpg",
      title: "Título de la tarjeta 2",
      description: "Descripción de la tarjeta 2"
    }
  ]
  
  const frontendCards = [
    {
      image: "images/skills/HTML5.png",
      title: "HTML5",
      description: "I use HTML5 to structure my web applications. It provides me with the foundation to create responsive, semantic, and accessible websites. By leveraging elements like <header>, <footer>, and <section>, I ensure my projects are both modern and organized."
    },
    {
      image: "images/skills/JS.png",
      title: "JavaScript",
      description: "I rely on JavaScript to handle client-side interactivity and logic. Whether it's manipulating the DOM, fetching data via APIs, or adding dynamic behavior, JavaScript allows me to create rich user experiences and responsive features in my projects."
    },
    {
      image: "images/skills/CSS3.png",
      title: "CSS3",
      description: "With CSS3, I style and enhance the visual appeal of my projects. I utilize Flexbox and Grid for layout design, and I frequently apply animations, transitions, and media queries to make my sites responsive and interactive across different devices."
    },
    {
      image: "images/skills/React.png",
      title: "React",
      description: "React is my go-to framework for building dynamic and scalable front-end applications. I use it to manage complex UI components, handle state efficiently, and create reusable pieces of code that speed up development. Hooks and the component-based architecture make building interactive UIs much smoother."
    },
    {
      image: "images/skills/Jira.png",
      title: "Jira",
      description: "I’ve used Jira extensively for task management and tracking in both academic group projects and professional settings. It allows me to plan, assign, and monitor progress efficiently, helping to ensure that deadlines are met and tasks are completed in an organized way."
    },
    {
      image: "images/skills/Git.png",
      title: "Git",
      description: "I use Git for version control in all my projects. It helps me track changes, collaborate on code with others, and manage different branches efficiently. Through Git, I ensure that my codebase is safe and that I can always roll back to a stable version if needed."
    },
    {
      image: "images/skills/Scrum.png",
      title: "Scrum",
      description: "In both university group projects and my role as a QA, I follow Scrum methodologies. I participate in sprints, daily stand-ups, and retrospectives, helping ensure that the development process is iterative and focused on delivering value."
    },
    {
      image: "images/skills/ASP.png",
      title: "ASP.Net (learning)",
      description: "For back-end development, I use ASP.NET to create scalable web applications. Whether it’s building RESTful services or dynamic server-side rendering, ASP.NET allows me to handle the heavy lifting behind the scenes with its robust framework."
    },
    {
      image: "images/skills/Python.png",
      title: "Python",
      description: "Python is my tool of choice for scripting, automating tasks, and building back-end services. I’ve used it in various capacities, from developing RESTful APIs to data manipulation and analysis. Its versatility makes it indispensable in my development process."
    },
    {
      image: "images/skills/SQL.png",
      title: "SQL",
      description: "SQL is essential for managing and querying relational databases in my projects. I use it to store, retrieve, and manipulate data, ensuring that my applications can efficiently access the information they need, whether it’s through MySQL or SQL Server."
    },
    {
      image: "images/skills/MongoDB.png",
      title: "MongoDB",
      description: "I turn to MongoDB when I need a NoSQL solution for projects that require flexibility in data storage. I use it to manage large datasets and unstructured data, ensuring my applications can handle real-time, fast, and scalable operations."
    }
  ]
  

  const softSkills = [
    {
      image: "images/softskills/problemSolving.jpeg",
      title: "Problem-solving" ,
      description: "Ability to identify, analyze, and solve issues effectively."
    },
    {
      image: "images/softskills/criticalThinking.jpeg",
      title: "Critical thinking" ,
      description: "Analyzing problems from different angles and making informed decisions."
    },
    {
      image: "images/softskills/creativity.jpeg",
      title: "Creativity" ,
      description: "Thinking outside the box to develop innovative solutions to complex problems."
    },
    {
      image: "images/softskills/attentionDetail.jpeg",
      title: "Attention to detail" ,
      description: "Spotting bugs, errors, and inconsistencies while maintaining high code quality."
    },
    {
      image: "images/softskills/priotization.jpeg",
      title: "Prioritization" ,
      description: "Determining which tasks are most important and focusing on them to meet project goals and deadlines efficiently."
    },
    {
      image: "images/softskills/resourcefulness.jpeg",
      title: "Resourcefulness" ,
      description: "Finding creative solutions and utilizing available resources efficiently when faced with challenges."
    },
    {
      image: "images/softskills/continuousLearning.jpeg",
      title: "Continuous learning" ,
      description: "Keeping up with evolving technologies and constantly improving skills."
    },
    {
      image: "images/softskills/curiosity.jpeg",
      title: "Curiosity" ,
      description: "A natural desire to explore new technologies, tools, and methods to improve your craft."
    },
    {
      image: "images/softskills/resilience.jpeg",
      title: "Resilience" ,
      description: "Ability to bounce back from setbacks and stay motivated through tough projects or when facing failure."
    },
    {
      image: "images/softskills/adaptabilityFeedback.jpeg",
      title: "Adaptability to feedback" ,
      description: "Accepting and applying constructive criticism to improve performance and code quality."
    },
    {
      image: "images/softskills/timeManagement.jpeg",
      title: "Time management" ,
      description: "Efficiently managing time, deadlines, and workloads."
    },
    {
      image: "images/softskills/collaboration.jpeg",
      title: "Collaboration" ,
      description: "Working well within a team, contributing to group efforts, and supporting colleagues."
    },
    {
      image: "images/softskills/communication.jpeg",
      title: "Communication" ,
      description: "Clear and concise verbal and written communication with both technical and non-technical stakeholders."
    },
    {
      image: "images/softskills/patience.jpeg",
      title: "Patience" ,
      description: "Remaining calm and persistent when debugging or facing challenges."
    },
    {
      image: "images/softskills/openMindedness.jpeg",
      title: "Open-mindedness" ,
      description: "Being receptive to feedback and different perspectives, especially in code reviews or team discussions."
    },
    {
      image: "images/softskills/selfMotivation.jpeg",
      title: "Self-motivation" ,
      description: "Driving your own learning and progress without needing constant supervision or external motivation."
    },
    {
      image: "images/softskills/stressManagement.jpeg",
      title: "Stress management" ,
      description: "Handling high-pressure situations, like tight deadlines or complex issues, without compromising performance."
    },
    {
      image: "images/softskills/humility.jpeg",
      title: "Humility" ,
      description: "Recognizing that you don’t know everything, being open to learning from others, and admitting mistakes when necessary."
    },
    {
      image: "images/softskills/workEthic.jpeg",
      title: "Work ethic" ,
      description: "Demonstrating dedication, discipline, and a strong commitment to completing tasks effectively."
    },
    {
      image: "images/softskills/listeningSkills.jpeg",
      title: "Listening skills" ,
      description: "Actively paying attention to others' ideas, concerns, and feedback, ensuring better collaboration and understanding."
    },
    {
      image: "images/softskills/Networking.jpeg",
      title: "Networking" ,
      description: "Building professional relationships within and outside the company to share knowledge, seek guidance, and explore new opportunities."
    },
    {
      image: "images/softskills/empathy.jpeg",
      title: "Empathy" ,
      description: "Understanding the needs and emotions of users, clients, and team members to create better solutions and foster positive relationships."
    }
  ]

  const myProyects = [
    {
      image: "images/projects/restarurant.jpeg",
      title: "Restaurant",
      description: "This project is a restaurant management app built with React, designed to assist waiters in taking customer orders efficiently. \
      The app allows staff to add orders directly to the order list, streamlining the ordering process. It is connected to a Node.js backend, ensuring \
      real-time updates between the front and back end (In menu items, for example). However, some functionalities, like saving completed orders, are \
      still under development. This project highlights my skills in building responsive front-end applications with backend integration to improve day-to-day operations.",
      url: "restaurante"
    },
    {
      image: "images/projects/todo.png",
      title: "To-do list",
      description: "This project is a simple and functional To-Do List built with React. It allows users to create, edit, and delete tasks, offering \
      a clean and intuitive interface for managing daily activities. The application stores tasks locally for now, ensuring usability even without backend \
      integration. However, a connected version with a Node.js backend is currently under development to enable persistent storage and synchronization \
      across devices. This project reflects my focus on dynamic front-end design and will soon evolve with full-stack functionality.",
      url: "to-do-list"
    }
  ]

  const navbarItems = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Projects", url: "/projects" },
    { label: "Contact", url: "#contact" }
  ]

  const [todos, setTodos] = useState([
    {name: "Something", active: true},
    {name: "Something 2", active: true},
    {name: "Supercalifragilisticexpialidocious", active: false},
    {name: "Even though the sound of it is something quite atrocious", active: false},
    {name: "buy hotcakes", active: true},
    {name: "Go to the supermarket", active: true},
    {name: "Buy more hotcakes", active: true},
    {name: "Fly like superman", active: true},
    {name: "Buy some eggos", active: true},
    {name: "Uyy muchachos, ustedeh ehcucharon el rempalago?", active: true},
  ])
  
  return (
    <MainApp>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/>
      </Helmet>
      <Navbar items={navbarItems} contactRef={contactRef} />
      <Routes>
        <Route path="/" element={
          <>
            <LandingPage/>
            {frontendCards && frontendCards.length > 0 && <Container cards={frontendCards} title="Technical Skills" />}
            {softSkills && softSkills.length > 0 && <Container cards={softSkills} title="Soft Skills" />}
          </>
        }/>
        <Route path="/about" element={<About />} />
        <Route path="*"  element={<PageNotFound />} />
        <Route path="/projects/*" element={<Container cards={myProyects}  text={"Go to project"} title="Projects"/>} />
        <Route path="/projects/to-do-list" element={<ToDoList todos={todos} setTodos={setTodos}/>}/>
        <Route path="/projects/restaurante" element={<Restarurante/>}/>
      </Routes>
      <Contact id="contact" ref={contactRef} />
      <Footer />
    </MainApp>
  )
}

export default App

{/*
  Crear twitter de programador
  Proyectos (descripcion, imagen, tecnologias, código)
  Poner pocos proyectos en la pagina de home
  Hobbies (recomendado)
  Categorizar habilidades tecnicas (front/back/...)
*/}