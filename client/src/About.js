import React from "react"
import styled from "styled-components"
import Certification from "./Certification"

const certificationsData = [
  {
    title: "Build Apps Using React: Introducing React for Web Applications",
    company: "Skillsoft",
    date: "Aug. 2023",
    credentialId: "5523621",
    imagePath: "/images/certifications/Build Apps Using React Introducing React for Web Applications.png",
    skills: "Computer Science"
  },
  {
    title: "Build Apps Using React: Local Machine & Online Playgrounds",
    company: "Skillsoft",
    date: "Aug. 2023",
    credentialId: "5523692",
    imagePath: "/images/certifications/Build Apps Using React Local Machine & Online Playgrounds.png",
    skills: "Computer Science"
  },
  {
    title: "Navigating Software Testing Tools: Types of Software Testing Tools",
    company: "Skillsoft",
    date: "Aug. 2023",
    credentialId: "5509961",
    imagePath: "/images/certifications/Navigating Software Testing Tools Types of Software Testing Tools.png",
    skills: "Computer Science"
  },
  {
    title: ".NET Development with Visual Studio",
    company: "Skillsoft",
    date: "Jul. 2023",
    credentialId: "5421308",
    imagePath: "/images/certifications/NET Development with Visual Studio.png",
    skills: "C# · .NET Framework · Computer Science"
  },
  {
    title: "ASP.NET MVC Web Applications: Introduction",
    company: "Skillsoft",
    date: "Jul. 2023",
    credentialId: "5509907",
    imagePath: "/images/certifications/ASP.NET MVC Web Applications Introduction.png",
    skills: "C# · .NET Framework · Computer Science"
  },
  {
    title: "HTML5 with JavaScript & CSS3: Advanced CSS",
    company: "Skillsoft",
    date: "Jul. 2023",
    credentialId: "5351755",
    imagePath: "/images/certifications/HTML5 with JavaScript & CSS3 Advanced CSS.png",
    skills: "Computer Science"
  },
  {
    title: "MEAN Stack Development",
    company: "Skillsoft",
    date: "Jul. 2023",
    credentialId: "5313125",
    imagePath: "/images/certifications/MEAN Stack Development.png",
    skills: "Computer Science"
  },
  {
    title: "MongoDB Aggregation",
    company: "Skillsoft",
    date: "Jul. 2023",
    credentialId: "5367339",
    imagePath: "/images/certifications/MongoDB Aggregation.png",
    skills: "Computer Science"
  },
  {
    title: "MongoDB Querying",
    company: "Skillsoft",
    date: "Jul. 2023",
    credentialId: "5302759",
    imagePath: "/images/certifications/MongoDB Querying.png",
    skills: "Computer Science"
  },
  {
    title: "REST API with Java: REST APIs with POSTMAN & CRUD",
    company: "Skillsoft",
    date: "Jul. 2023",
    credentialId: "5367975",
    imagePath: "/images/certifications/REST API with Java REST APIs with POSTMAN & CRUD.png",
    skills: "Computer Science"
  },
  {
    title: "AWS Developer Associate 2022: Amazon Elastic Compute Cloud (EC2)",
    company: "Skillsoft",
    date: "Jun. 2023",
    credentialId: "5010674",
    imagePath: "/images/certifications/AWS Developer Associate 2022 Amazon Elastic Compute Cloud (EC2).png",
    skills: "Computer Science · Amazon Web Services (AWS)"
  },
  {
    title: "Introduction to Git",
    company: "Skillsoft",
    date: "Jun. 2023",
    credentialId: "5086974",
    imagePath: "/images/certifications/Introduction to Git.png",
    skills: "Computer Science"
  },
  {
    title: "Jenkins for DevOps: The Basics of Jenkins",
    company: "Skillsoft",
    date: "Jun. 2023",
    credentialId: "5073564",
    imagePath: "/images/certifications/Jenkins for DevOps The Basics of Jenkins.png",
    skills: "Computer Science"
  },
  {
    title: "Scrum Foundation: Scrum Certification & the Scrum Guide",
    company: "Skillsoft",
    date: "Jun. 2023",
    credentialId: "5021856",
    imagePath: "/images/certifications/Scrum Foundation Scrum Certification & the Scrum Guide.png",
    skills: "Computer Science"
  },
  {
    title: "Scrum Toolbox: Jira for Scrum",
    company: "Skillsoft",
    date: "Jun. 2023",
    credentialId: "5042690",
    imagePath: "/images/certifications/Scrum Toolbox Jira for Scrum.png",
    skills: "Computer Science"
  },
  {
    title: "Secure Programmer: Software Testing",
    company: "Skillsoft",
    date: "Jun. 2023",
    credentialId: "5023254",
    imagePath: "/images/certifications/Secure Programmer Software Testing.png",
    skills: "Computer Science"
  },
  {
    title: "Working with Git",
    company: "Skillsoft",
    date: "Jun. 2023",
    credentialId: "5102118",
    imagePath: "/images/certifications/Working with Git.png",
    skills: "Computer Science"
  },
  {
    title: "The Language of DevOps: DevOps Tools & Processes",
    company: "Skillsoft",
    date: "May. 2023",
    credentialId: "4804472",
    imagePath: "/images/certifications/The Language of DevOps DevOps Tools & Processes.png",
    skills: "Computer Science"
  },
  {
    title: "Python without Borders: HTML, CSS, Flask and MySQL",
    company: "Hola Mundo",
    date: "Nov. 2021",
    credentialId: "UC-05293651-db5c-42f6-ad31-a2172db20bad",
    imagePath: "/images/certifications/Python sin fronteras HTML, CSS, Flask y MySQL.jpg",
    skills: "HTML5 · Front-end Coding · Computer Science · Git · Design Patterns"
  },
]

const StyledLink = styled.a`
  color: #007bff;
  text-decoration: underline;
  font-size: 1rem;
  font-weight: normal;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`

const AboutPageContainer = styled.div`
  padding: 20px;
  height: auto;
  color: #E0E0E0;
`

const Cert = styled.div`
  background-color: #3B3F46;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 8px;
  padding: 10px;
`

const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
  border-bottom: 2px solid #55F5ED;
  padding-bottom: 5px;
  color: #55F5ED;
`

const SectionText = styled.p`
  margin-top: 16px;
  margin-bottom: 5rem;
  line-height: 1.6;
  color: white;
  font-size: 1rem;
  text-align: justify;
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-top: 12px;
  }
`



const AboutPage = () => {
  return (
    <AboutPageContainer>
      <h1>About Me</h1>
      <SectionTitle>Brief Introduction</SectionTitle>
      <SectionText>
        Hi, my name is Luis Ureña. I'm a sel-taugh programmer because since I was a little kid I wanted to learn how computers work, so programming was my gol when I became an adult.<br/><br/>I'm a hardworking and dedicated person; capable of meeting or exceeding job expectations. Quick learner and eager to continue learning. Self-disciplined. Able to work efficiently with small or large groups of people.
      </SectionText>
      <SectionTitle>Professional Experience</SectionTitle>
      <SectionText>
        I worked from December 2021 until March 2023 as a QA analyst at Konrad Group.<br/><br/> I have been working on self-taught projects, which can be seen <StyledLink href="/projects">here</StyledLink> or by visiting "Projects" in the top menu.
      </SectionText>
      <SectionTitle>Education</SectionTitle>
      <SectionText>
        Bachelor's degree in high school education at "Liceo de Curridabat"
      </SectionText>
      <SectionTitle>Certifications</SectionTitle>
      <Cert>
      {certificationsData.map((certification, index) => (
        <Certification
          key={index}
          title={certification.title}
          company={certification.company}
          date={certification.date}
          credentialId={certification.credentialId}
          imagePath={certification.imagePath}
          skills={certification.skills}
        />
      ))}</Cert>
      <SectionTitle>Skills</SectionTitle>
      <SectionText>
        I'm proficient in JavaScript, Java, Node.js, C, C++, Assembly, AngularJS, SQL, and C#. However, the ones I master the most are React, HTML, CSS, MongoDB, and Python with the Flask framework.
      </SectionText>
      <SectionTitle>Interests</SectionTitle>
      <SectionText>
        I enjoy reading novels, especially science fiction or fantasy, playing video games, and programming as a hobby.
      </SectionText>
      <SectionTitle>Professional Goals</SectionTitle>
      <SectionText>
        My short-term goals are to work for a programming company and build knowledge with my colleagues. My long-term goals are to become a senior developer to be able to help other people with their programming problems.
      </SectionText>
      <SectionTitle>Languages</SectionTitle>
      <SectionText>
        I'm fluent in both English and Spanish, both spoken and written, with strong communication skills in both languages.
      </SectionText>
    </AboutPageContainer>
  )
}

export default AboutPage
