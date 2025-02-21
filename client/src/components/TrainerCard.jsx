import { useNavigate } from "react-router-dom";

const TrainerCard = ({ _id, name, expertise }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    if (!_id || _id.length !== 24) {
      console.error("Invalid Trainer ID passed to TrainerCard:", _id);
      return;
    }
    navigate(`/trainers/${_id}`);
  };

  return (
    <div className="border rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">{expertise}</p>
      <button
        onClick={handleViewProfile}
        className="bg-blue-500 text-white mt-4 py-2 px-4 rounded"
        disabled={!_id} // Disable button if no valid ID
      >
        View Profile
      </button>
    </div>
  );
};

export default TrainerCard;
