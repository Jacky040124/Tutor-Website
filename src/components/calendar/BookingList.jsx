import { useState, useEffect } from 'react';
import { useUser, useBooking } from "@/components/providers";
import { formatTime } from "@/lib/utils/timeUtils";
import FeedbackOverlay from '../overlays/FeedbackOverlay';
import { getStudentBookings, fetchFutureBookings } from '@/services/booking.service';
import HomeworkLinkOverlay from '../overlays/HomeworkLinkOverlay';

export default function BookingList() {
  const { teacherList, user, fetchStudentData } = useUser();
  const { bookings, setBookings } = useBooking();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showFeedbackOverlay, setShowFeedbackOverlay] = useState(false);
  const [studentNames, setStudentNames] = useState({});
  const userType = user.type;
  const [showHomeworkOverlay, setShowHomeworkOverlay] = useState(false);

  useEffect(() => {
    const fetchStudentNames = async () => {
      const names = {};
      for (const booking of bookings) {
        try {
          const { data: studentData } = await fetchStudentData(booking.studentId);
          names[booking.studentId] = studentData.nickname;
        } catch (error) {
          console.error(`Error fetching student data for ${booking.studentId}: ${error.message}`);
          names[booking.studentId] = booking.studentId;
        }
      }
      setStudentNames(names);
    };

    if (userType === 'teacher') {
      fetchStudentNames();
    }
  }, [bookings]);

  const isPastBooking = (booking) => {
    const bookingDate = new Date(booking.date.year, booking.date.month - 1, booking.date.day);
    return bookingDate < new Date();
  };

  const handleFeedback = (booking) => {
    setSelectedBooking(booking);
    setShowFeedbackOverlay(true);
  };

  const handleFeedbackSubmitted = async () => {
    try {
      if (userType === 'student') {
        const allBookings = await getStudentBookings(user.uid);
        setBookings(allBookings);
      } else {
        const teacherBookings = await fetchFutureBookings(user.uid);
        setBookings(teacherBookings);
      }
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    }
  };

  const handleUploadHomework = (booking) => {
    setSelectedBooking(booking);
    setShowHomeworkOverlay(true);
  };

  const handleHomeworkSuccess = async () => {
    try {
      const teacherBookings = await fetchFutureBookings(user.uid);
      setBookings(teacherBookings);
    } catch (error) {
      console.error("Error refreshing bookings:", error);
    }
  };

  const sortedBookings = [...bookings]
    .sort((a, b) => {
      const dateA = new Date(a.date.year, a.date.month - 1, a.date.day);
      const dateB = new Date(b.date.year, b.date.month - 1, b.date.day);
      return dateB - dateA;
    })
    .slice(0, 10);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
      <div className="space-y-4">
        {sortedBookings.map((booking) => {
          const past = isPastBooking(booking);
          
          return (
            <div
              key={booking.id}
              className={`p-4 border rounded-lg transition-colors ${past ? "bg-gray-50" : "hover:bg-gray-50"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {booking.date.day}/{booking.date.month}/{booking.date.year}
                  </p>
                  <p className="text-gray-600">
                    {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                  </p>
                  {booking.bulkId && (
                    <p className="text-sm text-green-600">
                      Lesson {booking.lessonNumber} of {booking.totalLessons}
                    </p>
                  )}
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="text-sm text-gray-500">
                    {userType === "teacher"
                      ? `Student: ${studentNames[booking.studentId] || booking.studentId}`
                      : `Teacher: ${teacherList[booking.teacherId]?.nickname || booking.teacherId}`}
                  </p>

                  <div>
                    <button
                      onClick={() => window.open(booking.link, "_blank")}
                      className="inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-semibold text-white shadow-sm bg-green-600 hover:bg-green-500 active:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Meet
                    </button>

                    {userType === "teacher" ? (
                      <button
                        onClick={() => handleUploadHomework(booking)}
                        className="inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-semibold text-white shadow-sm bg-green-600 hover:bg-green-500 active:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      >
                        {booking.homeworkLink ? "Update Homework" : "Upload Homework"}
                      </button>
                    ) : (
                      booking.homeworkLink && (
                        <button
                          onClick={() => window.open(booking.homeworkLink, "_blank")}
                          className="inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-semibold text-white shadow-sm bg-green-600 hover:bg-green-500 active:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          View Homework
                        </button>
                      )
                    )}
                  </div>

                  {past && userType === "student" && (
                    <button
                      onClick={() => handleFeedback(booking)}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      {booking.feedback ? "Edit Feedback" : "Add Feedback"}
                    </button>
                  )}
                  {past && userType === "teacher" && booking.feedback && (
                    <div className="text-sm">
                      <div className="text-yellow-400">
                        {"★".repeat(booking.feedback.rating)}
                        {"☆".repeat(5 - booking.feedback.rating)}
                      </div>
                      <p className="text-gray-600 mt-1">{booking.feedback.comment}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showFeedbackOverlay && selectedBooking && (
        <FeedbackOverlay
          booking={selectedBooking}
          onClose={() => setShowFeedbackOverlay(false)}
          onFeedbackSubmitted={handleFeedbackSubmitted}
        />
      )}

      {showHomeworkOverlay && selectedBooking && (
        <HomeworkLinkOverlay
          booking={selectedBooking}
          onClose={() => setShowHomeworkOverlay(false)}
          onSuccess={handleHomeworkSuccess}
        />
      )}
    </div>
  );
}
