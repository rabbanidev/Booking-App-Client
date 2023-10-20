"use client";
import EditButton from "@/components/UI/button/EditButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import TableLoader from "@/components/UI/loading/TableLoader";
import ActionBar from "@/components/shared/ActionBar";
import { useGetAllUsersQuery } from "@/redux/features/users/usersApi";

const UserListPage = () => {
  const { isLoading, isError, error, data } = useGetAllUsersQuery(undefined);

  //Decide what to render
  let content = null;
  if (isLoading) {
    content = <TableLoader />;
  } else if (!isLoading && isError) {
    content = <ErrorMessage errorMessage={(error as any).message} />;
  } else if (!isLoading && !isError && data?.users?.length === 0) {
    content = <ErrorMessage errorMessage="There is no users!" />;
  } else {
    content = (
      <div className="mt-5 w-full overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.users?.map((user) => (
                <tr className="text-gray-700" key={user.id}>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {user.user?.name?.firstName ||
                      user.admin?.name?.firstName ||
                      user.superAdmin?.name?.firstName}
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {user.user?.name?.lastName ||
                      user.admin?.name?.lastName ||
                      user.superAdmin?.name?.lastName}
                  </td>
                  <td className="px-4 py-3 text-xs border">{user.email}</td>
                  <td className="px-4 py-3 text-sm border">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ActionBar text="User List" href={`/super_admin/users/admin`} />
      {content}
    </div>
  );
};

export default UserListPage;
