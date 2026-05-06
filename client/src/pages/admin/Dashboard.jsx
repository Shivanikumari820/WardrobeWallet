import React from "react"
import { useNavigate } from "react-router-dom"
import { LayoutDashboard, Users, Package, BarChart3, LogOut, Menu } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import UserPage from "./UserPage"
import AllPickup from "./AllPickup"

const sidebarOptions = [
  { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
  { label: "Users", key: "users", icon: Users },
  { label: "All Pickup Orders", key: "orders", icon: Package },
  { label: "Logout", key: "logout", icon: LogOut },
 ]

const Dashboard = () => {
  const navigate = useNavigate()
  const [active, setActive] = React.useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [userCount, setUserCount] = React.useState(null)
  const [pickupCount, setPickupCount] = React.useState(null)
  const [totalWeight, setTotalWeight] = React.useState(null)
  const [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('https://cloth2cash.onrender.com/api/users')
        const data = await response.json()
        const users = Array.isArray(data) ? data : data.users || []
        setUserCount(users.length)
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setUserCount(null)
      }
    }
    fetchUserCount()
  }, [])

  React.useEffect(() => {
    const fetchPickupCount = async () => {
      try {
        const response = await fetch('https://cloth2cash.onrender.com/api/schedule')
        const data = await response.json()
        setPickupCount(Array.isArray(data) ? data.length : 0)
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setPickupCount(null)
      }
    }
    fetchPickupCount()
  }, [])

  React.useEffect(() => {
    const fetchTotalWeight = async () => {
      try {
        const response = await fetch('https://cloth2cash.onrender.com/api/schedule')
        const data = await response.json()
        const schedules = Array.isArray(data) ? data : []
        
        console.log('Schedule data for weight:', schedules) // Debug log
        console.log('Total schedules found:', schedules.length) // Debug log
        
        // Log the first few items to see structure
        if (schedules.length > 0) {
          console.log('First schedule item:', schedules[0])
          console.log('Available fields:', Object.keys(schedules[0]))
          
          // Check if pickup object exists and log its structure
          if (schedules[0].pickup) {
            console.log('Pickup object:', schedules[0].pickup)
            console.log('Pickup fields:', Object.keys(schedules[0].pickup))
          }
        }
        
        const total = schedules.reduce((sum, schedule) => {
          // Try multiple possible locations for weight/quantity data
          const weight = 
            schedule.pickup?.estimatedQuantity || 
            schedule.pickup?.quantity ||
            schedule.pickup?.weight ||
            schedule.estimatedQuantity ||
            schedule.quantity ||
            schedule.weight ||
            schedule.clothWeight ||
            schedule.totalWeight ||
            0
            
          const numericWeight = parseFloat(weight) || 0
          
          console.log('Item:', schedule._id || schedule.id, 'Raw weight:', weight, 'Parsed:', numericWeight) // Debug log
          
          return sum + numericWeight
        }, 0)
        
        console.log('Total calculated weight:', total) // Debug log
        setTotalWeight(total > 0 ? total.toFixed(2) : '0.00')
      } catch (error) {
        console.error('Error fetching weight:', error)
        setTotalWeight('0.00')
      }
    }
    fetchTotalWeight()
  }, [])

  React.useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch users data
        const usersResponse = await fetch('https://cloth2cash.onrender.com/api/users')
        const usersData = await usersResponse.json()
        const users = Array.isArray(usersData) ? usersData : usersData.users || []

        // Fetch orders data
        const ordersResponse = await fetch('https://cloth2cash.onrender.com/api/schedule')
        const ordersData = await ordersResponse.json()
        const orders = Array.isArray(ordersData) ? ordersData : []

        // Process data for last 7 days - showing cumulative totals
        const last7Days = []
        for (let i = 6; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          
          // Count all users created up to this date (cumulative)
          const usersUpToDate = users.filter(user => {
            const userDate = new Date(user.createdAt || user.date)
            return userDate <= date
          }).length

          // Count all orders created up to this date (cumulative)
          const ordersUpToDate = orders.filter(order => {
            const orderDate = new Date(order.createdAt || order.date || order.scheduledDate)
            return orderDate <= date
          }).length

          last7Days.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            users: usersUpToDate,
            orders: ordersUpToDate
          })
        }

        setChartData(last7Days)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }
    fetchChartData()
  }, [])

  const handleSidebarClick = (key) => {
    if (key === "logout") {
      localStorage.removeItem("isAdmin")
      navigate("/admin-login")
    } else {
      setActive(key)
      setSidebarOpen(false) // close sidebar on mobile after click
    }
  }

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div>
            {/* Stats Cards */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 p-6">
              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow p-6 text-center border border-green-200">
                <div className="text-3xl font-bold text-green-700">
                  {userCount !== null ? userCount : "--"}
                </div>
                <div className="text-gray-600 mt-2">Total Users</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow p-6 text-center border border-blue-200">
                <div className="text-3xl font-bold text-blue-700">
                  {pickupCount !== null ? pickupCount : "--"}
                </div>
                <div className="text-gray-600 mt-2">Pickup Orders</div>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl shadow p-6 text-center border border-orange-200">
                <div className="text-3xl font-bold text-orange-700">
                  {totalWeight !== null ? `${totalWeight} kg` : "--"}
                </div>
                <div className="text-gray-600 mt-2">Total Clothes Weight</div>
              </div>
            </div>

            {/* Separate Charts for Users and Orders */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 mb-6 p-6">
              {/* Users Chart */}
              <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Users Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 5 }}
                      name="Total Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Orders Chart */}
              <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Orders Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="orders" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]}
                      name="Total Orders"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )
      case "users":
        return <UserPage />
      case "orders":
        return <AllPickup />
      default:
        return null
    }
  }

  return (
    <div className="flex bg-gray-100 h-screen min-h-screen max-h-screen overflow-hidden ">
      {/* Sidebar for desktop, overlay for mobile */}
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity md:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
        `}
        style={{ minHeight: "100vh", height: "100vh", maxHeight: "100vh" }}
      >
        <div className="font-bold text-xl py-6 text-center text-green-700">
          Cloth2Cash
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleSidebarClick(opt.key)}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === opt.key
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <opt.icon className="w-5 h-5" />
              {opt.label}
              {/* Show count badges */}
              {opt.key === "users" && userCount !== null && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-auto min-w-[22px] h-[22px] flex items-center justify-center font-semibold">
                  {userCount}
                </span>
              )}
              {opt.key === "orders" && pickupCount !== null && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-auto min-w-[22px] h-[22px] flex items-center justify-center font-semibold">
                  {pickupCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="text-center text-gray-400 text-xs py-4 border-t border-gray-200">
          © {new Date().getFullYear()} Cloth2Cash
        </div>
        {/* Bottom border aligned with topbar */}
        <div className="absolute left-0 right-0 bottom-[calc(100%-4rem)] h-px bg-gray-200 md:block hidden" style={{zIndex: 10}} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen max-h-screen ">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 justify-between relative z-10 flex-shrink-0">
          {/* Sidebar toggle button for mobile */}
          <button
            className="md:hidden mr-2 p-2 rounded hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6 text-green-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 truncate">
            {sidebarOptions.find((opt) => opt.key === active)?.label}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 overflow-y-auto ">
          <div className=" overflow-x-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
