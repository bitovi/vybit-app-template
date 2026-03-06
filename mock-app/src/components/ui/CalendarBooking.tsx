import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Mail, User, Check } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

export interface CalendarBookingProps {
  className?: string;
}

export function CalendarBooking({ className = '' }: CalendarBookingProps) {
  const [selectedDate, setSelectedDate] = useState<number>(7);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const timeSlots: TimeSlot[] = [
    { time: '9:00am', available: true },
    { time: '9:30am', available: true },
    { time: '10:00am', available: true },
    { time: '10:30am', available: true },
    { time: '11:00am', available: true },
    { time: '11:30am', available: false },
    { time: '1:00pm', available: true },
    { time: '1:30pm', available: true },
    { time: '2:00pm', available: true },
    { time: '2:30pm', available: false },
    { time: '3:00pm', available: true },
    { time: '3:30pm', available: true },
  ];

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const calendarDays = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, null, null, null, null],
  ];

  const getDayName = (day: number) => {
    const date = new Date(2026, 3, day); // April 2026
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && selectedTime) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="calendar-booking-wrapper">
        <div className="w-full max-w-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00848B] mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-[#334041] mb-3">
            Meeting Scheduled!
          </h2>
          <p className="text-lg text-[#334041] mb-6">
            We've sent a confirmation email to <strong>{email}</strong>
          </p>
          <div className="bg-[#F4F5F5] rounded-lg p-6 mb-6 inline-block">
            <p className="text-xl font-semibold text-[#334041] mb-2">
              {getDayName(selectedDate)}
            </p>
            <p className="text-lg text-[#00848B] mb-2">{selectedTime}</p>
            <p className="text-[#334041]">with a Bitovi representative</p>
          </div>
          <div>
            <button 
              className="bg-[#F5532D] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#d4461f] transition-colors"
              onClick={() => {
                setIsSubmitted(false);
                setSelectedTime('');
                setName('');
                setEmail('');
              }}
            >
              Schedule Another Meeting
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`calendar-booking-wrapper ${className}`}>
      <div className="calendar-booking-grid">
        {/* Calendar Section */}
        <div className="calendar-section-content">
          <div>
            <h3 className="calendar-section-title">
              Select a Date & Time
            </h3>
          </div>
          
          <div className="calendar-month-nav">
            <button 
              className="p-2 hover:bg-[#F4F5F5] rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-[#334041]" />
            </button>
            <span className="text-lg font-medium text-[#334041]">April 2026</span>
            <button 
              className="p-2 hover:bg-[#F4F5F5] rounded-lg transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-[#334041]" />
            </button>
          </div>

          <div className="calendar-grid-container">
            <div className="calendar-weekdays-row">
              {weekDays.map((day) => (
                <div key={day} className="calendar-weekday-label">
                  {day}
                </div>
              ))}
            </div>
            <div className="space-y-1">
              {calendarDays.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-1">
                  {week.map((day, dayIndex) => (
                    <button
                      key={dayIndex}
                      className={`
                        h-8 rounded text-xs font-medium transition-all
                        ${!day ? 'invisible' : ''}
                        ${day === selectedDate 
                          ? 'bg-[#00848B] text-white' 
                          : 'text-[#334041] hover:bg-[#F4F5F5]'
                        }
                      `}
                      onClick={() => day && setSelectedDate(day)}
                      disabled={!day}
                    >
                      {day || ''}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Slots & Form Section */}
        <div className="booking-section-content">
          <div className="selected-date-display">
            {getDayName(selectedDate)}
          </div>

          <div className="time-slots-grid">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                className={`
                  time-slot-button
                  ${!slot.available ? 'time-slot-unavailable' : ''}
                  ${selectedTime === slot.time ? 'time-slot-selected' : 'time-slot-available'}
                `}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
          </div>

          {selectedTime && (
            <form className="booking-form-container" onSubmit={handleSubmit}>
              <div className="booking-form-header">
                <div className="text-sm font-medium text-[#334041] mb-1">
                  Your Information
                </div>
                <div className="text-sm text-[#00848B]">
                  Selected: {selectedTime}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="name" className="form-label">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="form-input"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="form-submit-button"
              >
                Confirm Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
