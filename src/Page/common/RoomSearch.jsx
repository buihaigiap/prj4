import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';
import { Drawer } from 'antd';  // Import the Drawer component from Ant Design

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);  // State to control the Drawer visibility

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError('Please select all fields');
      return false;
    }
    try {
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          showError('Room not currently available for this date range on the selected room type.');
          return;
        }
        handleSearchResult(response.roomList);
        setError('');
      }
    } catch (error) {
      showError("Unknown error occurred: " + error.response.data.message);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <>
      <section
        className="absolute bottom-0  left-20 right-20 bg-white shadow-lg"
        onClick={() => setIsDrawerVisible(true)}  // Open Drawer on click
      >
        <div className="flex">
          <div className="flex-1 border-r border-gray-300 p-4">
            <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="location">
              ĐỊA ĐIỂM
            </label>
            <input
              className="w-full text-sm text-gray-700 leading-tight focus:outline-none"
              id="location"
              type="text"
              value="Khách sạn Silverland Jolie"
              readOnly
            />
          </div>
          <div className="flex-1 border-r border-gray-300 p-4">
            <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="check-in">
              CHECK-IN
            </label>
            <input
              className="w-full text-sm text-gray-700 leading-tight focus:outline-none"
              id="check-in"
              type="text"
              value={`${getCurrentDate()} — ${getTomorrowDate()}`}
              readOnly
            />
          </div>
          <div
            className="flex-none bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-4 flex items-center justify-center bg-opacity-70"

            style={{ width: '33.33%' }}
          >
            <button type="button" className="text-lg">
              ĐẶT NGAY
            </button>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>

      <Drawer
        placement="bottom"
        closable={true}
        onClose={() => setIsDrawerVisible(false)}  // Close Drawer
        visible={isDrawerVisible}
        height="50%"  // Set Drawer height to 50% of screen
      >
        <div className="p-4">
          {/* Add your form elements or other content here */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room-type">
              Room Type
            </label>
            <select
              id="room-type"
              className="w-full border border-gray-300 p-2 rounded"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">Select Room Type</option>
              {roomTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handleInternalSearch}
            >
              Search
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default RoomSearch;
