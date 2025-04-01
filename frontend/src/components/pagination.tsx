interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPae: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <>
      <div className="flex item-center justify-center mt-4">
        <button
          disabled={currentPage === 1}
          className="btn"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            disabled={currentPage === i + 1}
            className="btn"
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>

        <br />
        <label>
          Results Per Page:
          <select
            value={pageSize}
            onChange={(p) => {
              onPageSizeChange(Number(p.target.value));
              onPageChange(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </>
  );
};

export default Pagination;
