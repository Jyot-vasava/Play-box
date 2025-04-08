import { useEffect, useState } from "react"; // Import React hooks
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { toast } from "react-toastify"; // Import toast for notifications
import Loader from "../../component/Loader"; // Import custom loader component
import { useProfileMutation } from "../../redux/api/users"; // Import mutation function for updating user profile
import { setCredentials } from "../../redux/features/auth/authSlice"; // Import Redux action to update credentials

const Profile = () => {
  // State variables for form fields and form errors
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Extract user info from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Mutation hook to update user profile with loading state
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  // Populate username and email fields with existing user data on component mount
  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo]);

  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Function to validate form input fields
  const validateForm = () => {
    const errors = {};

    // Validate username
    if (!username.trim()) errors.username = "Name is required.";

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
    if (!email.trim()) errors.email = "Email is required.";
    else if (!emailRegex.test(email)) errors.email = "Invalid email format.";

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors; // Return errors object
  };

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formErrors = validateForm(); // Validate form input fields
    setErrors(formErrors); // Set form errors in state

    if (Object.keys(formErrors).length === 0) {
      // If no errors, attempt to update profile
      try {
        // Call mutation to update user profile
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res })); // Update credentials in Redux store
        toast.success("Profile updated successfully"); // Display success message
      } catch (err) {
        // Handle error during profile update
        toast.error(err?.data?.message || err.error); // Display error message
      }
    } else {
      // If validation errors exist, display an error toast
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    // Container div with background styling
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {/* Form container with styling */}
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Update Profile
        </h2>
        <form onSubmit={submitHandler} noValidate>
          {/* Username input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className={`form-input p-4 rounded-sm w-full ${
                errors.username ? "border-red-500" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          {/* Email input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className={`form-input p-4 rounded-sm w-full ${
                errors.email ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Password input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Change Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className={`form-input p-4 rounded-sm w-full ${
                errors.password ? "border-red-500" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* Confirm password input field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`form-input p-4 rounded-sm w-full ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="bg-teal-500 w-full font-bold text-white py-3 px-4 rounded hover:bg-teal-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loadingUpdateProfile}
          >
            {loadingUpdateProfile ? <Loader /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
