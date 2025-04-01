import { useNavigate } from 'react-router-dom';
import { Project } from '../types/Project';
import { useEffect, useState } from 'react';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from './pagination';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, pageNum, selectedCategories);
        setProjects(data.projects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading projects... </p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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
          <button
            className="btn btn-success"
            onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}
          >
            Donate
          </button>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default ProjectList;
