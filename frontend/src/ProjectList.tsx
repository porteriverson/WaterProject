import { Project } from './types/Project';
import { useEffect, useState } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        'http://localhost:4000/api/water/AllProjects'
      );
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map((p) => (
        <div id="ProjectCard">
          <h3>{p.projectName}</h3>
          <ul>
            <li>Project Type: {p.projectType}</li>
            <li>Project Region Program: {p.projectRegionalProgram}</li>
            <li>Impact: {p.projectImpact} individuals served</li>
            <li>Project Phase: {p.projectPhase}</li>
            <li>Project Status: {p.projectFunctionalityStatus}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default ProjectList;
