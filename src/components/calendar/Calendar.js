import BookingOverlay from '@/components/calendar/BookingOverlay';
import { useState, useEffect } from 'react';
import { normalizeToMidnight,getAdjustedWeekday,getWeekBounds} from '@/lib/utils/timeUtils';
import { handleBookingConfirmed } from '@/components/booking/ConfirmBook'
import ErrorMessage from '@/components/common/ErrorMessage';
import { addDays, isSameDay, getDate } from 'date-fns';
import { useUser } from '@/components/providers/UserContext';
import { getTeacherBookings } from '@/services/booking.service';

export default function Calendar({availability, teacherData, userType, handleClickEvent}) {
    const [weekOffset, setWeekOffset] = useState(0);
    const [showBookingOverlay, setShowBookingOverlay] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [error, setError] = useState('');
    const [bookings, setBookings] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchBookings = async () => {
            console.log('Fetching bookings...');
            console.log('TeacherData:', teacherData);
            
            if (!teacherData) {
                console.log('TeacherData is null or undefined');
                return;
            }
            
            if (!teacherData.uid) {
                console.log('TeacherData structure:', Object.keys(teacherData));
                console.log('Missing uid in teacherData');
                return;
            }

            console.log("Attempting to fetch bookings for teacher:", teacherData.uid);
            try {
                const fetchedBookings = await getTeacherBookings(teacherData.uid);
                console.log("Fetched bookings:", fetchedBookings);
                setBookings(fetchedBookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to fetch bookings");
            }
        };

        fetchBookings();
    }, [teacherData?.uid]);

    if (!teacherData?.uid) {
        return <div>Loading teacher data...</div>;
    }

    useEffect(() => {
        console.log("showBookingOverlay changed to:", showBookingOverlay);
    }, [showBookingOverlay]);

    const handleLastWeek = () => {setWeekOffset(prev => prev - 1);};
    const handleNextWeek = () => {setWeekOffset(prev => prev + 1);};

    const handleTimeSlotClick = (day, startTime, endTime) => {
        if (userType === 'student') {
            if (endTime - startTime >= 1) {
                const { monday } = getWeekBounds(weekOffset);
                const selectedDate = new Date(monday.year, monday.month - 1, monday.day);
                selectedDate.setDate(selectedDate.getDate() + (day - 1));
                
                setSelectedTimeSlot({
                    date: { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, day: selectedDate.getDate()},
                    startTime: startTime,
                    endTime: Math.min(startTime + 1, endTime)
                });
                setShowBookingOverlay(true);
            } else {
                alert("This time slot is too short for a lesson");
            }
        } else if (handleClickEvent) {
            handleClickEvent(day, startTime, endTime);
        }
    };

    const Events = () => {
        if (!Array.isArray(availability)) {
            return null;
        }

        const { monday, sunday } = getWeekBounds(weekOffset);
        const mondayBound = normalizeToMidnight(monday);
        const sundayBound = normalizeToMidnight(sunday);
                
        // Process availability slots
        const availabilityEvents = availability.map((event, index) => {
            if (!event?.date?.year || !event?.date?.month || !event?.date?.day) {
                return null;
            }
            
            try {
                const eventDate = normalizeToMidnight(event.date);
                
                if (eventDate >= mondayBound && eventDate <= sundayBound) {
                    const adjustedWeekday = getAdjustedWeekday(eventDate);
                    
                    return (
                        <EventDisplay 
                            key={`avail_${index}`} 
                            day={adjustedWeekday} 
                            endTime={event.endTime} 
                            startTime={event.startTime}
                            isBooking={false}
                        />
                    );
                }
                return null;
            } catch (error) {
                return null;
            }
        });

        // Process bookings
        const bookingEvents = bookings.map((booking, index) => {
            if (!booking?.date?.year || !booking?.date?.month || !booking?.date?.day) {
                return null;
            }

            try {
                const bookingDate = normalizeToMidnight(booking.date);
                
                if (bookingDate >= mondayBound && bookingDate <= sundayBound) {
                    const adjustedWeekday = getAdjustedWeekday(bookingDate);
                    
                    return (
                        <EventDisplay 
                            key={`booking_${index}`} 
                            day={adjustedWeekday} 
                            endTime={booking.endTime} 
                            startTime={booking.startTime}
                            isBooking={true}
                            studentId={booking.studentId}
                        />
                    );
                }
                return null;
            } catch (error) {
                return null;
            }
        });

        return (
            <ol className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8" 
                style={{ gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto" }}>
                {availabilityEvents}
                {bookingEvents}
            </ol>
        );
    };
    
    
    const EventDisplay = ({day, startTime, endTime, isBooking, studentId}) => {
        const numberToColStart = {
            1: 'sm:col-start-1',  // Monday
            2: 'sm:col-start-2',  // Tuesday
            3: 'sm:col-start-3',  // Wednesday
            4: 'sm:col-start-4',  // Thursday
            5: 'sm:col-start-5',  // Friday
            6: 'sm:col-start-6',  // Saturday
            7: 'sm:col-start-7'   // Sunday
        };

        const startRow = (startTime * 12) + 2;
        const EndRows = (endTime-startTime) * 12;

        return (
            <li className={`relative mt-px hidden ${numberToColStart[day]} sm:flex`} 
                style={{ gridRow: `${startRow} / span ${EndRows}` }}>
                <a onClick={() => !isBooking && handleTimeSlotClick(day, startTime, endTime)} 
                   className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg 
                              ${isBooking 
                                ? 'bg-red-100 cursor-default' 
                                : endTime - startTime >= 1 
                                    ? 'bg-green-100 hover:bg-green-200' 
                                    : 'bg-gray-100'} 
                              p-2 text-xs leading-5`}>
                    <p className="text-gray-500 group-hover:text-gray-700">
                        <time dateTime={`2022-01-15T${startTime}:00`}>{startTime}:00</time>
                        {isBooking && studentId && (
                            <span className="ml-1 text-red-600">
                                (Booked)
                            </span>
                        )}
                    </p>
                </a>
            </li>
        )
    }

    const VerticalGrid = () => {
        return (
        <div className={`col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7`}>
            <div className="col-start-1 row-span-full"></div>
            <div className="col-start-2 row-span-full"></div>
            <div className="col-start-3 row-span-full"></div>
            <div className="col-start-4 row-span-full"></div>
            <div className="col-start-5 row-span-full"></div>
            <div className="col-start-6 row-span-full"></div>
            <div className="col-start-7 row-span-full"></div>
            <div className="col-start-8 row-span-full w-8"></div>
        </div>
        );
    };
    

    const WeekdayHeader = () => {
        const { monday } = getWeekBounds(weekOffset);
        const mondayDate = new Date(monday.year, monday.month - 1, monday.day);
        
        const weekDates = Array(7).fill(null).map((_, index) => {
            const date = addDays(mondayDate, index);
            return {
                date: getDate(date),
                isToday: isSameDay(date, new Date())
            };
        });
        
        const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const mobileDayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

        return (
            <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8">
                <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
                    {mobileDayLabels.map((day, i) => (
                        <button key={i} type="button" className="flex flex-col items-center pb-3 pt-2">
                            {day}
                            <span className={`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${
                                weekDates[i].isToday ? 'rounded-full bg-indigo-600 text-white' : 'text-gray-900'
                            }`}>
                                {weekDates[i].date}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                    <div className="col-end-1 w-14"></div>
                    {dayLabels.map((day, i) => (
                        <div key={i} className="flex items-center justify-center py-3">
                            <span className="flex items-baseline">
                                {day}
                                <span className={`ml-1.5 ${
                                    weekDates[i].isToday ? 'flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : 'items-center justify-center font-semibold text-gray-900'
                                }`}>
                                    {weekDates[i].date}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="flex h-full flex-col">

                <div className="isolate flex flex-auto flex-col overflow-auto bg-white">
                    <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full" style={{ width: "165%" }}>
                        <div className="flex justify-between items-center">
                            <button onClick={handleLastWeek} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Previous Week
                            </button>
                            <button onClick={handleNextWeek} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Next Week
                            </button>
                        </div>
                        <WeekdayHeader />

                        <div className="flex flex-auto">
                            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100"></div>
                            <div className="grid flex-auto grid-cols-1 grid-rows-1">

                                <div className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100" style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}>
                                    <div className="row-end-1 h-7"></div>
                                    <div> <div className="calendarText">12AM</div> </div>
                                    <div> </div>
                                    <div> <div className="calendarText">1AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">2AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">3AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">4AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">5AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">6AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">7AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">8AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">9AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">10AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">11AM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">12PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">1PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">2PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">3PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">4PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">5PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">6PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">7PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">8PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">9PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">10PM</div> </div>
                                    <div></div>
                                    <div> <div className="calendarText">11PM</div> </div>
                                    <div></div>
                                </div>

                                <VerticalGrid />

                                <Events/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <ErrorMessage message={error} />}
            {showBookingOverlay && (
                <BookingOverlay
                    selectedSlot={selectedTimeSlot}
                    teacherData={teacherData}
                    onConfirm={(booking) => handleBookingConfirmed(booking, availability, setShowBookingOverlay, user.balance)}
                    onClose={() => setShowBookingOverlay(false)}
                />
            )}
            
            {/* Debug section */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Debug Information:</h3>
                <div className="space-y-2">
                    <p>Number of Bookings: {bookings.length}</p>
                    <div className="text-sm font-mono whitespace-pre-wrap">
                        <p className="font-semibold">Bookings:</p>
                        {JSON.stringify(bookings, null, 2)}
                    </div>
                </div>
            </div>
        </>
    );
}