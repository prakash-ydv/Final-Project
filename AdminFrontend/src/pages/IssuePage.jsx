import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  WrenchIcon, 
  ClockIcon, 
  ExclamationCircleIcon,
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  UserGroupIcon,
  ArrowPathIcon,
  CheckBadgeIcon,
  XMarkIcon
} from "@heroicons/react/24/solid";

// Custom Leaflet marker icons
const highPriorityIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  className: "priority-high-marker"
});

const mediumPriorityIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  className: "priority-medium-marker"
});

const lowPriorityIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  className: "priority-low-marker"
});

const IssuePage = () => {
  const [issue, setIssue] = useState({
    id: "ISSUE001",
    title: "Water pipe leakage near MP Nagar",
    description: "Major leakage causing water wastage and road flooding. Urgent attention required. The leakage has created a small pond on the road, making it difficult for pedestrians and vehicles to pass. Local residents have reported water contamination in their supply.",
    location: "MP Nagar Zone 1, Bhopal",
    priority: "high",
    status: "In Progress",
    lat: 23.2333,
    lng: 77.4344,
    history: [
      { date: "2025-08-05", action: "Reported by citizen", icon: ClockIcon, color: "text-gray-500" },
      { date: "2025-08-06", action: "Assigned to repair team", icon: UserGroupIcon, color: "text-blue-500" },
      { date: "2025-08-07", action: "Repair work started", icon: WrenchIcon, color: "text-orange-500" },
      { date: "2025-08-08", action: "Materials delivered", icon: PaperClipIcon, color: "text-purple-500" },
    ],
    attachments: [
      { id: 1, type: "image", url: "https://images.unsplash.com/photo-1620744189347-af5c8e00784f?auto=format&fit=crop&w=600" },
      { id: 2, type: "image", url: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?auto=format&fit=crop&w=600" },
      { id: 3, type: "document", url: "#", name: "Damage_Assessment.pdf" },
    ],
    comments: [
      { id: 1, user: "Rajesh Kumar", role: "Civil Engineer", time: "2 hours ago", text: "Site inspection completed. We need to replace a 2-meter section of the pipe. Materials have been ordered." },
      { id: 2, user: "Ananya Sharma", role: "Area Coordinator", time: "4 hours ago", text: "Please prioritize this repair as it's affecting water supply to 50+ households." },
    ],
    assignedTeam: "Municipal Repair Team #4",
    estimatedCompletion: "2025-08-10",
    waterSaved: "Approx. 500,000 liters/day",
    affectedArea: "Zone 1 & 2",
    reporter: "Vikram Patel",
    reporterContact: "vikram.p@example.com"
  });

  const [newComment, setNewComment] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [mapZoom, setMapZoom] = useState(15);
  const [activeTab, setActiveTab] = useState("details");
  const [teamAssignment, setTeamAssignment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    
    const newCommentObj = {
      id: issue.comments.length + 1,
      user: "You",
      role: "Admin",
      time: "Just now",
      text: newComment
    };
    
    setIssue({
      ...issue,
      comments: [newCommentObj, ...issue.comments]
    });
    
    setNewComment("");
  };

  const handleResolve = () => {
    setIsResolving(false);
    setIssue({
      ...issue,
      status: "Resolved",
      history: [
        ...issue.history,
        { date: new Date().toISOString().split('T')[0], action: "Issue Resolved", icon: CheckBadgeIcon, color: "text-green-500" }
      ]
    });
  };

  const handleReject = () => {
    setIsRejecting(false);
    setIssue({
      ...issue,
      status: "Rejected",
      history: [
        ...issue.history,
        { date: new Date().toISOString().split('T')[0], action: "Issue Rejected", icon: XMarkIcon, color: "text-red-500" }
      ]
    });
  };

  const handleAssignTeam = () => {
    if (!teamAssignment) return;
    
    setIsAssigning(false);
    setIssue({
      ...issue,
      assignedTeam: teamAssignment,
      history: [
        ...issue.history,
        { date: new Date().toISOString().split('T')[0], action: `Assigned to ${teamAssignment}`, icon: UserGroupIcon, color: "text-blue-500" }
      ]
    });
    setTeamAssignment("");
  };

  const getPriorityIcon = () => {
    switch(issue.priority) {
      case "high": return highPriorityIcon;
      case "medium": return mediumPriorityIcon;
      case "low": return lowPriorityIcon;
      default: return highPriorityIcon;
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with issue info */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 mt-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{issue.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                    ${issue.priority === "high" ? "bg-red-500" : issue.priority === "medium" ? "bg-yellow-500" : "bg-green-500"}`}>
                    {issue.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="h-4 w-4" />
                    <span>Reported: {issue.history[0].date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <WrenchIcon className="h-4 w-4" />
                    <span>Status: {issue.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UserGroupIcon className="h-4 w-4" />
                    <span>Team: {issue.assignedTeam}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold 
                  ${issue.status === "Resolved" ? "bg-green-500" : issue.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"}`}>
                  {issue.status}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mt-8">
            <button 
              className={`py-4 px-6 font-medium ${activeTab === "details" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("details")}
            >
              Issue Details
            </button>
            <button 
              className={`py-4 px-6 font-medium ${activeTab === "updates" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("updates")}
            >
              Updates & Comments
            </button>
            <button 
              className={`py-4 px-6 font-medium ${activeTab === "analytics" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("analytics")}
            >
              Impact Analytics
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Description</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Reported by: {issue.reporter}</span>
                    <a href={`mailto:${issue.reporterContact}`} className="text-blue-500 hover:underline">{issue.reporterContact}</a>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{issue.description}</p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700">Affected Area</h3>
                    <p className="text-lg font-medium">{issue.affectedArea}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700">Water Saved</h3>
                    <p className="text-lg font-medium">{issue.waterSaved}</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                    <span>{issue.location}</span>
                  </div>
                </div>
                <div className="h-96 w-full">
                  <MapContainer 
                    center={[issue.lat, issue.lng]} 
                    zoom={mapZoom} 
                    className="h-full w-full"
                    scrollWheelZoom={true}
                  >
                    <TileLayer 
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[issue.lat, issue.lng]} icon={getPriorityIcon()}>
                      <Popup className="font-medium">
                        <div className="font-bold text-blue-700">{issue.title}</div> 
                        <div className="text-sm">{issue.location}</div>
                        <div className="mt-1 text-xs text-gray-500">Priority: {issue.priority}</div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Right Column - Status and Actions */}
            <div className="space-y-6">
              {/* Status Timeline */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Status Timeline</h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <ul className="space-y-4">
                    {issue.history.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-4 relative">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${step.color.replace('text-', 'bg-')} bg-opacity-20`}>
                          <step.icon className={`h-5 w-5 ${step.color}`} />
                        </div>
                        <div className="pb-6">
                          <p className="font-medium">{step.action}</p>
                          <p className="text-gray-500 text-sm">{step.date}</p>
                        </div>
                        {/* Progress bar connector */}
                        {idx !== issue.history.length - 1 && (
                          <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Next step */}
                  <div className="flex items-start gap-4 relative">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 bg-gray-200">
                      <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">Next Step</p>
                      <p className="text-gray-700">{issue.estimatedCompletion ? `Estimated completion: ${issue.estimatedCompletion}` : "Pending next action"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Attachments</h2>
                <div className="grid grid-cols-2 gap-4">
                  {issue.attachments.map((file) => (
                    <div key={file.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {file.type === "image" ? (
                        <img 
                          src={file.url} 
                          alt="Issue attachment" 
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="bg-gray-100 p-4 flex flex-col items-center justify-center h-32">
                          <PaperClipIcon className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-sm font-medium truncate">{file.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Updates & Comments</h2>
            
            <div className="mb-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    Y
                  </div>
                </div>
                <div className="flex-1">
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add an update or comment..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                  ></textarea>
                  <div className="mt-2 flex justify-between">
                    <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                      <PaperClipIcon className="h-4 w-4" />
                      <span>Attach file</span>
                    </button>
                    <button 
                      onClick={handleAddComment}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                      {comment.user.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-bold">{comment.user}</span>
                          <span className="text-gray-500 ml-2 text-sm">{comment.role}</span>
                        </div>
                        <div className="text-gray-400 text-sm">{comment.time}</div>
                      </div>
                      <p className="mt-2">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isResolving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Confirm Resolution</h3>
              <button onClick={() => setIsResolving(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="mb-4">Are you sure you want to mark this issue as resolved?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsResolving(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleResolve}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isRejecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Confirm Rejection</h3>
              <button onClick={() => setIsRejecting(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="mb-4">Are you sure you want to reject this issue?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsRejecting(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleReject}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isAssigning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Assign to Team</h3>
              <button onClick={() => setIsAssigning(false)} className="text-gray-500 hover:text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Select Team</label>
              <select 
                value={teamAssignment}
                onChange={(e) => setTeamAssignment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select a team</option>
                <option value="Municipal Repair Team #1">Municipal Repair Team #1</option>
                <option value="Municipal Repair Team #2">Municipal Repair Team #2</option>
                <option value="Emergency Response Team">Emergency Response Team</option>
                <option value="Quality Inspection Team">Quality Inspection Team</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsAssigning(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAssignTeam}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssuePage;