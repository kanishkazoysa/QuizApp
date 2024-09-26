export const formateDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// How to use it - we can get the joined date and last login date of the user and format it using the formatDate function:
{
<p className="text-gray-300">
  <span className="font-bold">Joined: </span>
  {new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
</p>;

<p className="text-gray-300">
  <span className="font-bold">Last login: </span>
  {formateDate(user.lastLogin)}
</p>;
}


// for logout function for a button
const {user , logout} = useAuthStore();

const handleLogout = () => {
    Logout();
};

<button onClick={handleLogout}>logout</button>
