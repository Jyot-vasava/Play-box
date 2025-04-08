import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="z-50"
      />

      <div className="max-w-7xl mx-auto">
        {/* Main Content Container */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">Manage Genres</h1>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Genre Form Section */}
            <div className="mb-8">
              <GenreForm
                value={name}
                setValue={setName}
                handleSubmit={handleCreateGenre}
              />
            </div>

            {/* Genres Grid */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">
                Available Genres
              </h2>

              {/* Loading State */}
              {!genres && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}

              {/* Empty State */}
              {genres?.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No genres available</p>
                </div>
              )}

              {/* Genres List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {genres?.map((genre) => (
                  <button
                    key={genre._id}
                    onClick={() => {
                      setModalVisible(true);
                      setSelectedGenre(genre);
                      setUpdatingName(genre.name);
                    }}
                    className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 
                             text-white rounded-lg transition-colors duration-200
                             border border-gray-600 hover:border-gray-500
                             focus:outline-none focus:ring-2 focus:ring-teal-500
                             truncate text-sm sm:text-base"
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              Edit Genre: {selectedGenre?.name}
            </h2>
            <GenreForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdateGenre}
              buttonText="Update"
              handleDelete={handleDeleteGenre}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;

