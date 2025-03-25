import { Project } from './types/Project';
import { useEffect, useState } from 'react';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setProjects(data.projects);
      setTotalItems(data.totalNumProjects);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchProjects();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  return (
    <>
      {projects.map((p) => (
        <div className="card" id="ProjectCard" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type: </strong>
                {p.projectType}
              </li>
              <li>
                <strong>Project Region Program:</strong>{' '}
                {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact:</strong> {p.projectImpact} individuals served
              </li>
              <li>
                <strong>Project Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Project Status:</strong> {p.projectFunctionalityStatus}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button
        disabled={pageNum === 1}
        className="btn"
        onClick={() => setPageNum(pageNum - 1)}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          disabled={pageNum === i + 1}
          className="btn"
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="btn"
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results Per Page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
