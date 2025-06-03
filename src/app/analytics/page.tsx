export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">Track your business performance and insights.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Download report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Trends */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Revenue Growth</dt>
                  <dd className="text-lg font-medium text-gray-900">+12.5%</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4 h-32 bg-gray-50 rounded"></div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Wireless Earbuds</p>
                    <p className="text-sm text-gray-500">234 units sold</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">$21,023</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Smart Watch</p>
                    <p className="text-sm text-gray-500">156 units sold</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">$31,198</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Demographics */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Customer Demographics</h3>
            <div className="mt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">18-24</div>
                    <div className="text-gray-900">25%</div>
                  </div>
                  <div className="mt-1 bg-gray-200 rounded-full">
                    <div className="h-2 bg-indigo-600 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">25-34</div>
                    <div className="text-gray-900">45%</div>
                  </div>
                  <div className="mt-1 bg-gray-200 rounded-full">
                    <div className="h-2 bg-indigo-600 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">35-44</div>
                    <div className="text-gray-900">20%</div>
                  </div>
                  <div className="mt-1 bg-gray-200 rounded-full">
                    <div className="h-2 bg-indigo-600 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
          <div className="mt-4">
            <div className="h-64 bg-gray-50 rounded"></div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">$54,670</dd>
              <dd className="mt-2 text-sm text-green-600">+8.1% from last month</dd>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <dt className="text-sm font-medium text-gray-500 truncate">Average Order Value</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">$156</dd>
              <dd className="mt-2 text-sm text-green-600">+4.3% from last month</dd>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">3.6%</dd>
              <dd className="mt-2 text-sm text-red-600">-0.5% from last month</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}