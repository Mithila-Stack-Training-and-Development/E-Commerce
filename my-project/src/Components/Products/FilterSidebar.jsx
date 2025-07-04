import { useSearchParams } from "react-router-dom";
import { useState } from "react";


const FilterSidebar = () => {


    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
    })

  return (
    <div>FilterSidebar</div>
  );
};

export default FilterSidebar;


