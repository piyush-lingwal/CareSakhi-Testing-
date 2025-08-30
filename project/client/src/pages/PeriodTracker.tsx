import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, AlertCircle, Plus, ChevronLeft, ChevronRight, Clock, Target, Zap, Bell, BookOpen, Activity } from 'lucide-react';

const PeriodTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [cycleData, setCycleData] = useState({
    lastPeriodDate: '',
    cycleLength: 28,
    periodLength: 5,
    symptoms: []
  });

  const [prediction, setPrediction] = useState(null);
  const [todaySymptoms, setTodaySymptoms] = useState([]);
  const [quickActions, setQuickActions] = useState([
    { id: 'log-symptoms', name: 'Log Symptoms', icon: Activity, active: false, count: 0 },
    { id: 'set-reminder', name: 'Set Reminder', icon: Bell, active: false, count: 0 },
    { id: 'track-mood', name: 'Track Mood', icon: Heart, active: false, count: 0 },
    { id: 'view-insights', name: 'View Insights', icon: Target, active: false, count: 0 }
  ]);

  // Calendar functionality
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const selectDate = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selected);
    setCycleData(prev => ({
      ...prev,
      lastPeriodDate: selected.toISOString().split('T')[0]
    }));
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentDate.getMonth() && 
                     today.getFullYear() === currentDate.getFullYear();
      
      const isPeriodDay = cycleData.lastPeriodDate && 
                         new Date(cycleData.lastPeriodDate).getDate() === day &&
                         new Date(cycleData.lastPeriodDate).getMonth() === currentDate.getMonth();
      
      const isSelected = selectedDate && 
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === currentDate.getMonth();
      
      days.push(
        <button
          key={day}
          onClick={() => selectDate(day)}
          className={`h-12 w-12 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300 hover:scale-110 ${
            isSelected
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-110'
              : isToday 
              ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md' 
              : isPeriodDay
              ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-2 border-red-300 shadow-sm'
              : 'hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 hover:shadow-md'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  const symptoms = [
    'Cramps', 'Headache', 'Mood Swings', 'Bloating', 
    'Fatigue', 'Breast Tenderness', 'Acne', 'Food Cravings'
  ];

  const moods = [
    { emoji: '😊', name: 'Happy', color: 'bg-yellow-100 text-yellow-700' },
    { emoji: '😢', name: 'Sad', color: 'bg-blue-100 text-blue-700' },
    { emoji: '😤', name: 'Irritated', color: 'bg-red-100 text-red-700' },
    { emoji: '😴', name: 'Tired', color: 'bg-purple-100 text-purple-700' },
    { emoji: '🤗', name: 'Emotional', color: 'bg-pink-100 text-pink-700' },
    { emoji: '😌', name: 'Calm', color: 'bg-green-100 text-green-700' }
  ];

  const handleInputChange = (e) => {
    setCycleData({
      ...cycleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSymptomToggle = (symptom) => {
    setCycleData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleQuickAction = (actionId) => {
    setQuickActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, active: !action.active, count: action.count + 1 }
        : action
    ));
  };

  const calculatePrediction = () => {
    if (!cycleData.lastPeriodDate) return;

    const lastDate = new Date(cycleData.lastPeriodDate);
    const nextPeriod = new Date(lastDate);
    nextPeriod.setDate(lastDate.getDate() + parseInt(cycleData.cycleLength));

    const ovulation = new Date(lastDate);
    ovulation.setDate(lastDate.getDate() + parseInt(cycleData.cycleLength) - 14);

    const today = new Date();
    const daysUntilNext = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));

    setPrediction({
      nextPeriod: nextPeriod.toDateString(),
      ovulation: ovulation.toDateString(),
      daysUntilNext
    });
  };

  useEffect(() => {
    if (cycleData.lastPeriodDate) {
      calculatePrediction();
    }
  }, [cycleData.lastPeriodDate, cycleData.cycleLength]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Period Tracker
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Track your cycle and get personalized predictions
            </p>
          </div>

          {/* Main Dashboard */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Cycle Overview Card */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-pink-600" />
                  Cycle Overview
                </h2>
                {prediction && (
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Next Period</div>
                    <div className="text-lg font-bold text-pink-600">
                      {prediction.daysUntilNext > 0 ? `${prediction.daysUntilNext} days` : 'Due now'}
                    </div>
                  </div>
                )}
              </div>

              {/* Cycle Input Form */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Period Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cycleData.lastPeriodDate ? new Date(cycleData.lastPeriodDate).toLocaleDateString() : ''}
                      onClick={() => setShowCalendar(true)}
                      readOnly
                      placeholder="Select date from calendar"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all cursor-pointer bg-gradient-to-r from-pink-50 to-purple-50"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Cycle Length (days)
                  </label>
                  <input
                    type="number"
                    name="cycleLength"
                    value={cycleData.cycleLength}
                    onChange={handleInputChange}
                    min="21"
                    max="35"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Integrated Calendar */}
              {showCalendar && (
                <div className="mb-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200 shadow-inner">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Select Period Start Date</h3>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-300"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <h4 className="text-lg font-semibold text-gray-800 min-w-[140px] text-center">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h4>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-300"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Calendar Grid */}
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="h-10 flex items-center justify-center text-sm font-semibold text-gray-600">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {renderCalendar()}
                    </div>
                    
                    {/* Calendar Legend */}
                    <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                        <span className="text-gray-600">Today</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 rounded-full"></div>
                        <span className="text-gray-600">Period Day</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Selected</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setShowCalendar(false)}
                      className="bg-white text-gray-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-md"
                    >
                      Close Calendar
                    </button>
                  </div>
                </div>
              )}

              {/* Symptoms Tracking */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Current Symptoms
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {symptoms.map(symptom => (
                    <button
                      key={symptom}
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        cycleData.symptoms.includes(symptom)
                          ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border-2 border-pink-300 shadow-lg scale-105'
                          : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:border-pink-200 hover:shadow-md'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              {/* Dynamic Quick Actions */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickActions.map(action => {
                    const IconComponent = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        className={`w-full p-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-between ${
                          action.active
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                            : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5" />
                          <span>{action.name}</span>
                        </div>
                        {action.count > 0 && (
                          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                            {action.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mood Tracker */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  Today's Mood
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {moods.map(mood => (
                    <button
                      key={mood.name}
                      className={`p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 ${mood.color} hover:shadow-md`}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs font-medium">{mood.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Tips */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                  Daily Tip
                </h3>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    💧 Stay hydrated during your period! Drinking plenty of water can help reduce bloating and ease cramps naturally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Predictions Section */}
          {prediction && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-8 h-8" />
                  <div className="text-right">
                    <div className="text-2xl font-bold">{prediction.daysUntilNext}</div>
                    <div className="text-sm opacity-90">days</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Next Period</h3>
                <p className="text-sm opacity-90">{prediction.nextPeriod}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8" />
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {Math.ceil((new Date(prediction.ovulation) - new Date()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-sm opacity-90">days</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Ovulation</h3>
                <p className="text-sm opacity-90">{prediction.ovulation}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <Activity className="w-8 h-8" />
                  <div className="text-right">
                    <div className="text-2xl font-bold">{cycleData.cycleLength}</div>
                    <div className="text-sm opacity-90">days</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Cycle Length</h3>
                <p className="text-sm opacity-90">Average cycle</p>
              </div>
            </div>
          )}

          {/* Insights and Analytics */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cycle History */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-pink-600" />
                Cycle Insights
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Cycle Regularity</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">85%</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Your cycles are quite regular</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Symptom Patterns</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Most Common:</span>
                      <span className="font-medium text-blue-700">Cramps (80%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trending:</span>
                      <span className="font-medium text-blue-700">Mood Swings ↑</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Health Score</h4>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-green-600">8.5</div>
                    <div className="text-sm text-gray-600">
                      <div>Excellent cycle health</div>
                      <div className="text-xs">Based on regularity & symptoms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-pink-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-pink-600" />
                Personalized Tips
              </h2>

              <div className="space-y-4">
                <div className="border-l-4 border-pink-500 pl-6 py-3 bg-pink-50 rounded-r-xl">
                  <h4 className="font-semibold text-gray-800">Hydration Reminder</h4>
                  <p className="text-gray-600 text-sm">Drink 8-10 glasses of water daily to reduce bloating and cramps.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-6 py-3 bg-purple-50 rounded-r-xl">
                  <h4 className="font-semibold text-gray-800">Exercise Suggestion</h4>
                  <p className="text-gray-600 text-sm">Light yoga or walking can help reduce period pain naturally.</p>
                </div>
                
                <div className="border-l-4 border-emerald-500 pl-6 py-3 bg-emerald-50 rounded-r-xl">
                  <h4 className="font-semibold text-gray-800">Sleep Schedule</h4>
                  <p className="text-gray-600 text-sm">Maintain 7-8 hours of sleep for better hormone regulation.</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-6 py-3 bg-blue-50 rounded-r-xl">
                  <h4 className="font-semibold text-gray-800">Nutrition Tip</h4>
                  <p className="text-gray-600 text-sm">Iron-rich foods help combat fatigue during your period.</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Get Personalized Plan
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 bg-white rounded-3xl shadow-2xl p-6 border border-pink-100">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-800">Ready to track your cycle?</h3>
                <p className="text-gray-600">Get started with personalized predictions and insights</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCalendar(true)}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Select Period Date
                </button>
                <button className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 hover:text-white transition-all duration-300">
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodTracker;