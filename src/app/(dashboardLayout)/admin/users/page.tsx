"use client";
import EditButton from "@/components/UI/button/EditButton";
import ErrorMessage from "@/components/UI/error/ErrorMessage";
import TableLoader from "@/components/UI/loading/TableLoader";
import ActionBar from "@/components/shared/ActionBar";
import {
  useGetAllNormalUsersQuery,
  useEnableUserByAuthorityMutation,
} from "@/redux/features/users/usersApi";

const UserListPage = () => {
  const { isLoading, isError, error, data } =
    useGetAllNormalUsersQuery(undefined);
  const [enableUserByAuthority] = useEnableUserByAuthorityMutation();

  const enableUserHandler = (id: string | undefined) => {
    enableUserByAuthority(id);
  };

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
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.users?.map((user) => (
                <tr className="text-gray-700" key={user.id}>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {user.user?.name?.firstName}
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {user.user?.name?.lastName}
                  </td>
                  <td className="px-4 py-3 text-xs border">{user.email}</td>
                  <td className="px-4 py-3 text-sm border">{user.role}</td>
                  <td className="px-4 py-3 text-sm border">
                    {user?.user?.active ? (
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        Active / Enable
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm border flex gap-x-3">
                    <EditButton href={`/admin/users/update/${user.id}`} />
                    <button
                      className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-2 py-2"
                      onClick={() => enableUserHandler(user?.user?.id)}
                    >
                      Status Change
                    </button>
                  </td>
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
      <ActionBar
        text="User List"
        // href={`${userInfo?.role}/services/create`}
      />
      {content}
    </div>
  );
};

export default UserListPage;
