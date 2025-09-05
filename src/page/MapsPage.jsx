import { FiFilter } from "react-icons/fi";
import ButtonCostum from "../components/Button";

const MapsPage = ({dismiss}) => {
  if (dismiss) return;
  return (
    <div>
      <ButtonCostum icon={FiFilter} type="floatingButton" />
    </div>
  );
};

export default MapsPage;
