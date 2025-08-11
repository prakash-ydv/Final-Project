import React, { useState } from 'react';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  MapPinIcon, 
  WrenchIcon, 
  UserGroupIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

function RecentIssueCard({
  issueId = "IR-2024-015",
  title = "Water leak on Elm Street",
  priority = "high",
  location = "Elm Street & 3rd Ave, Downtown District",
  category = "Infrastructure",
  timeAgo = "10 minutes ago",
  description = "Significant water leak causing flooding on Elm Street. Water pressure seems unusually high. Multiple residents have reported the issue.",
  reporter = "Sarah Johnson",
  reporterContact = "sarah.j@example.com",
  assignedTo = "Not assigned",
  status = "reported"
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentAssignedTo, setCurrentAssignedTo] = useState(assignedTo);
  const [isSaved, setIsSaved] = useState(false);
  
  const priorityColors = {
    high: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
    medium: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
    low: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" }
  };
  
  const statusColors = {
    reported: { bg: "bg-blue-100", text: "text-blue-800", icon: ClockIcon },
    assigned: { bg: "bg-purple-100", text: "text-purple-800", icon: UserGroupIcon },
    progress: { bg: "bg-yellow-100", text: "text-yellow-800", icon: WrenchIcon },
    resolved: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircleIcon }
  };
  
  const priorityIcons = {
    high: <ExclamationTriangleIcon className="w-4 h-4" />,
    medium: <ExclamationTriangleIcon className="w-4 h-4" />,
    low: <ExclamationTriangleIcon className="w-4 h-4" />
  };
  
  const statusOptions = [
    { value: "reported", label: "Reported", icon: ClockIcon },
    { value: "assigned", label: "Assigned", icon: UserGroupIcon },
    { value: "progress", label: "In Progress", icon: WrenchIcon },
    { value: "resolved", label: "Resolved", icon: CheckCircleIcon }
  ];
  
  const teamOptions = [
    { id: "team1", name: "Emergency Response Team" },
    { id: "team2", name: "Infrastructure Maintenance" },
    { id: "team3", name: "Water Department" },
    { id: "team4", name: "Quality Control" }
  ];
  
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const getPriorityLabel = (priority) => {
    switch(priority) {
      case "high": return "High Priority";
      case "medium": return "Medium Priority";
      case "low": return "Low Priority";
      default: return priority;
    }
  };
  
  const getStatusLabel = (status) => {
    const option = statusOptions.find(opt => opt.value === status);
    return option ? option.label : status;
  };

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-md transition-all duration-300 ${priorityColors[priority].border} ${isExpanded ? "mb-4" : "mb-2"}`}>
      {/* Priority indicator bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${priority === "high" ? "bg-red-500" : priority === "medium" ? "bg-orange-400" : "bg-green-400"}`}></div>
      
      {/* Main card content */}
      <div className={`${priorityColors[priority].bg} p-4 cursor-pointer`} onClick={toggleExpand}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-700 bg-white px-2 py-0.5 rounded-md">{issueId}</span>
              <h2 className="text-base font-bold text-gray-900 truncate">{title}</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[priority].text}`}>
                {priorityIcons[priority]}
                <span className="capitalize">{getPriorityLabel(priority)}</span>
              </div>
              
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[currentStatus].bg} ${statusColors[currentStatus].text}`}>
                {/* <statusColors[currentStatus].icon className="w-3 h-3" /> */}
                <span>{getStatusLabel(currentStatus)}</span>
              </div>
              
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                <MapPinIcon className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{location}</span>
              </div>
              
              <div className="text-xs text-gray-500">{timeAgo}</div>
            </div>
          </div>
          
          <button className="p-1 text-gray-500 hover:text-gray-700 ml-2">
            {isExpanded ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Expanded details */}
      {isExpanded && (
        <div className="bg-white p-4 border-t border-gray-100 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Reporter</h3>
              <div className="text-sm text-gray-600">
                <div>{reporter}</div>
                <a href={`mailto:${reporterContact}`} className="text-blue-600 hover:underline">{reporterContact}</a>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Update Status</label>
              <div className="relative">
                <select 
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Assign To Team</label>
              <div className="relative">
                <select 
                  value={currentAssignedTo}
                  onChange={(e) => setCurrentAssignedTo(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="Not assigned">Select team...</option>
                  {teamOptions.map(team => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={handleSave}
                className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center ${
                  isSaved 
                    ? "bg-green-100 text-green-700" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    Changes Saved
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
          
          {/* Status visualization */}
          <div className="mt-4">
            <h3 className="text-xs font-medium text-gray-700 mb-2">Progress Status</h3>
            <div className="flex items-center">
              {statusOptions.map((statusOption, index) => (
                <React.Fragment key={statusOption.value}>
                  <div 
                    className={`flex flex-col items-center ${
                      statusOptions.findIndex(opt => opt.value === currentStatus) >= index 
                        ? statusColors[statusOption.value].text 
                        : "text-gray-300"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      statusOptions.findIndex(opt => opt.value === currentStatus) >= index 
                        ? statusColors[statusOption.value].bg 
                        : "bg-gray-100"
                    }`}>
                      <statusOption.icon className="w-4 h-4" />
                    </div>
                    <span className="mt-1 text-xs">{statusOption.label}</span>
                  </div>
                  
                  {index < statusOptions.length - 1 && (
                    <div className={`flex-1 h-1 mx-[-2px] ${
                      statusOptions.findIndex(opt => opt.value === currentStatus) > index 
                        ? statusColors[statusOption.value].bg 
                        : "bg-gray-200"
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentIssueCard;