const Overview = () => {
  return (
    <section className="mt-10">
      <div className="container">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          Overview
        </h3>
        <div className="mt-5">
          <div className="relative flex flex-col mt-2 text-gray-700 bg-white w-full rounded">
            <p className="text-gray-700 text-sm">
              Hotel management project provides room booking, staff management
              and other necessary hotel management features. The system allows
              the manager to post available rooms in the system. Customers can
              view and book room online. Admin has the power of either approving
              or disapproving the customer’s booking request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
